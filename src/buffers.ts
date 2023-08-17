import { concatenateArrayBuffers, copy } from "./util.js";

/**
 * The main Binary Buffer object. It contains the buffer and the operations to read and write data.
 * @template T The type of the object to be stored in the buffer.
 */
export type BinaryBuffer<
  T extends Record<string, unknown> = Record<string, unknown>,
> = {
  [K in keyof T]: Getter<T[K]>;
};

/**
 * A getter object that contains the get and set methods.
 */
export type Getter<T> = {
  /**
   * Gets the value from the buffer.
   * @returns The value.
   */
  get: () => T;
  /**
   * Sets the value in the buffer.
   * @param value The value to be set.
   */
  set: (value: T) => void;
};

/**
 * A descriptor object. It contains the name of the type for each property.
 * @template T The type of the object to be stored in the buffer.
 */
export type Descriptor<T> = Record<keyof T, string>;

/**
 * The wrapped binary buffer object. It contains the buffer, the operations to read and
 * write data and a copy method to copy the buffer. The copy method is useful to create
 * a new buffer with the same structure.
 */
export type WrappedBinaryBuffer<
  T extends Record<string, unknown> = Record<string, unknown>,
> = { buffer: ArrayBuffer; ops: BinaryBuffer<T>; copy: () => ArrayBuffer };

/**
 * A type definition object. It contains the name of the type, the byte length, the
 * serialize and deserialize methods.
 */
export interface TypeDefinition<T> {
  /** The name of the type. */
  name: string;
  /** The byte length of the type. */
  byteLength: number;
  /**
   * Serializes the value into an ArrayBuffer.
   * @param value The value to be serialized.
   * @returns The serialized value.
   */
  serialize: (value: T) => ArrayBuffer;
  /**
   * Deserializes the value from an ArrayBuffer.
   * @param buffer The buffer to be deserialized.
   * @returns The deserialized value.
   */
  deserialize: (buffer: ArrayBuffer) => T;
}

/**
 * A buffer builder object. It contains the buffer and the operations to read and write data.
 */
export class BufferBuilder {
  /** The buffer. */
  private buffer: ArrayBuffer;
  /** The DataView object. */
  private view: DataView;
  /** The offset. */
  private offset: number = 0;
  /** The types. */
  private types: Record<string, TypeDefinition<any>> = {};

  constructor(bufferSize: number = 1024) {
    this.buffer = new ArrayBuffer(bufferSize);
    this.view = new DataView(this.buffer);
  }

  /**
   * Registers a type.
   * @param typeDef The type definition.
   * @template T The type of the object to be stored in the buffer.
   */
  registerType<T>(typeDef: TypeDefinition<T>) {
    this.types[typeDef.name] = typeDef;
  }

  /**
   * Creates a buffer. The buffer contains the header and the data. The header contains
   * the type IDs of the data. The data is serialized using the registered types.
   *
   * You can either use `createBuffer` or `createBuild` to create a buffer. By using
   * `createBuffer` you can set the properties one by one. By using `createBuild` you
   * can set the properties all at once.
   * @param descriptor The descriptor.
   * @template T The type of the object to be stored in the buffer.
   * @returns The wrapped binary buffer object.
   */
  createBuffer<T extends Record<string, unknown>>(
    descriptor: Descriptor<T>,
  ): WrappedBinaryBuffer<T> {
    const typeNames = Object.values(descriptor);
    const typeIds = typeNames.map((typeName) => {
      const typeId = Object.keys(this.types).indexOf(typeName);
      if (typeId === -1) {
        throw new Error(`Type '${typeName}' is not registered.`);
      }
      return typeId;
    });

    // Serialize the type IDs into a header int32 array
    const headerBuffer = new Int32Array(typeIds);
    const headerArrayBuffer = headerBuffer.buffer;

    // Concatenate the header and data buffers
    const concatenatedBuffer = concatenateArrayBuffers(
      headerArrayBuffer,
      this.buffer,
    );

    const ops: BinaryBuffer<T> = {} as BinaryBuffer<T>;

    // Create the getters and setters
    for (const [key, typeName] of Object.entries(descriptor)) {
      const typeDef = this.types[typeName];

      // Create the operations
      ops[key as keyof T] = {
        get: () => typeDef.deserialize(concatenatedBuffer.slice(this.offset)),
        set: (value: any) => {
          const bytes = typeDef.serialize(value);
          this.view.setUint32(this.offset, bytes.byteLength);
          new Uint8Array(this.buffer, this.offset + 4, bytes.byteLength).set(
            new Uint8Array(bytes),
          );
          this.offset += 4 + bytes.byteLength;
        },
      };
    }

    // Return the wrapped binary buffer object
    return { buffer: concatenatedBuffer, ops, copy: copy(concatenatedBuffer) };
  }

  /**
   * Creates an object with the same structure.
   *
   * You can either use `createBuffer` or `createBuild` to create a buffer. By using
   * `createBuffer` you can set the properties one by one. By using `createBuild` you
   * can set the properties all at once.
   * @param descriptor The descriptor.
   * @template T The type of the object to be stored in the buffer.
   * @returns A function that creates an object with the same structure.
   */
  createBuild<T extends Record<string, unknown>>(
    descriptor: Descriptor<T>,
  ): (properties: T) => WrappedBinaryBuffer<T> {
    return (properties: T) => {
      const { buffer, ops, copy } = this.createBuffer<T>(
        structuredClone(descriptor), // clone to prevent mutation
      );

      for (const [key, value] of Object.entries(properties)) {
        ops[key as keyof T].set(value as any);
      }

      return { buffer, ops, copy };
    };
  }

  /**
   * Creates a wrapped binary buffer object from an ArrayBuffer. This is handy when
   * you want to create a wrapped binary buffer object from a buffer that you received
   * from a network request.
   * @param descriptor The descriptor.
   * @returns A function that creates a wrapped binary buffer object.
   */
  createWrapper<T extends Record<string, unknown>>(
    descriptor: Descriptor<T>,
  ): (buffer: ArrayBuffer) => WrappedBinaryBuffer<T> {
    const descr = structuredClone(descriptor); // clone to prevent mutation

    return (input: ArrayBuffer) => {
      const header = new Int32Array(input, 0, Object.keys(descr).length);
      const typeIds = Array.from(header);
      const types = typeIds.map((typeId) => {
        const typeName = Object.keys(this.types)[typeId];
        if (!typeName) {
          throw new Error(`Type ID '${typeId}' is not registered.`);
        }
        return this.types[typeName];
      });

      let offset = header.byteLength;
      const ops: BinaryBuffer<T> = {} as BinaryBuffer<T>;

      for (const [key, typeDef] of Object.entries(types)) {
        descr[key as keyof T] = typeDef.name;

        ops[key as keyof T] = {
          get: () => typeDef.deserialize(input.slice(offset)),
          set: (value: unknown) => {
            const bytes = typeDef.serialize(value);
            const length = bytes.byteLength;
            new Uint8Array(input, offset, length).set(new Uint8Array(bytes));
            offset += length;
          },
        };
      }

      return { buffer: input, ops, copy: copy(input) };
    };
  }
}
