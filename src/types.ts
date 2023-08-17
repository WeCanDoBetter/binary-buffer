import type { TypeDefinition } from "./buffers.js";
import { concatenateArrayBuffers } from "./util.js";

/**
 * The `uint8` type definition. To register this type definition, use the
 * `registerType` function. This type matches the `number` type in TypeScript,
 * and can contain integers between 0 and 255. For a larger range, use the
 * `uint16` or `uint32` type definitions.
 *
 * This type's byte usage is 1.
 *
 * @example
 * ```ts
 * import { BufferBuilder } from "@wecandobetter/binary-buffer";
 * import { uint8 } from "@wecandobetter/binary-buffer/types";
 *
 * const builder = new BufferBuilder();
 * builder.registerType(uint8);
 * ```
 */
export const uint8: TypeDefinition<number> = {
  name: "uint8",
  byteLength: 1,
  serialize: (value: number) => {
    const buffer = new ArrayBuffer(1);
    new DataView(buffer).setUint8(0, value);
    return buffer;
  },
  deserialize: (buffer: ArrayBuffer) => {
    return new DataView(buffer).getUint8(0);
  },
};

/**
 * The `uint16` type definition. To register this type definition, use the
 * `registerType` function. This type matches the `number` type in TypeScript,
 * and can contain integers between 0 and 65535. For a larger range, use the
 * `uint32` type definition.
 *
 * This type's byte usage is 2.
 *
 * @example
 * ```ts
 * import { BufferBuilder } from "@wecandobetter/binary-buffer";
 * import { uint16 } from "@wecandobetter/binary-buffer/types";
 *
 * const builder = new BufferBuilder();
 * builder.registerType(uint16);
 * ```
 */
export const uint16: TypeDefinition<number> = {
  name: "uint16",
  byteLength: 2,
  serialize: (value: number) => {
    const buffer = new ArrayBuffer(2);
    new DataView(buffer).setUint16(0, value);
    return buffer;
  },
  deserialize: (buffer: ArrayBuffer) => {
    return new DataView(buffer).getUint16(0);
  },
};

/**
 * The `uint32` type definition. To register this type definition, use the
 * `registerType` function. This type matches the `number` type in TypeScript,
 * and can contain integers between 0 and 4294967295. For a smaller range, use
 * the `uint16` or `uint8` type definitions.
 *
 * This type's byte usage is 4.
 *
 * @example
 * ```ts
 * import { BufferBuilder } from "@wecandobetter/binary-buffer";
 * import { uint32 } from "@wecandobetter/binary-buffer/types";
 *
 * const builder = new BufferBuilder();
 * builder.registerType(uint32);
 * ```
 */
export const uint32: TypeDefinition<number> = {
  name: "uint32",
  byteLength: 4,
  serialize: (value: number) => {
    const buffer = new ArrayBuffer(4);
    new DataView(buffer).setUint32(0, value);
    return buffer;
  },
  deserialize: (buffer: ArrayBuffer) => {
    return new DataView(buffer).getUint32(0);
  },
};

/**
 * The `int8` type definition. To register this type definition, use the
 * `registerType` function. This type matches the `number` type in TypeScript,
 * and can contain integers between -128 and 127. For a larger range, use the
 * `int16` or `int32` type definitions.
 *
 * This type's byte usage is 1.
 *
 * @example
 * ```ts
 * import { BufferBuilder } from "@wecandobetter/binary-buffer";
 * import { int8 } from "@wecandobetter/binary-buffer/types";
 *
 * const builder = new BufferBuilder();
 * builder.registerType(int8);
 * ```
 */
export const int8: TypeDefinition<number> = {
  name: "int8",
  byteLength: 1,
  serialize: (value: number) => {
    const buffer = new ArrayBuffer(1);
    new DataView(buffer).setInt8(0, value);
    return buffer;
  },
  deserialize: (buffer: ArrayBuffer) => {
    return new DataView(buffer).getInt8(0);
  },
};

/**
 * The `int16` type definition. To register this type definition, use the
 * `registerType` function. This type matches the `number` type in TypeScript,
 * and can contain integers between -32768 and 32767. For a larger range, use
 * the `int32` type definition.
 *
 * This type's byte usage is 2.
 *
 * @example
 * ```ts
 * import { BufferBuilder } from "@wecandobetter/binary-buffer";
 * import { int16 } from "@wecandobetter/binary-buffer/types";
 *
 * const builder = new BufferBuilder();
 * builder.registerType(int16);
 * ```
 */
export const int16: TypeDefinition<number> = {
  name: "int16",
  byteLength: 2,
  serialize: (value: number) => {
    const buffer = new ArrayBuffer(2);
    new DataView(buffer).setInt16(0, value);
    return buffer;
  },
  deserialize: (buffer: ArrayBuffer) => {
    return new DataView(buffer).getInt16(0);
  },
};

/**
 * The `int32` type definition. To register this type definition, use the
 * `registerType` function. This type matches the `number` type in TypeScript,
 * and can contain integers between -2147483648 and 2147483647. For a smaller
 * range, use the `int16` or `int8` type definitions.
 *
 * This type's byte usage is 4.
 *
 * @example
 * ```ts
 * import { BufferBuilder } from "@wecandobetter/binary-buffer";
 * import { int32 } from "@wecandobetter/binary-buffer/types";
 *
 * const builder = new BufferBuilder();
 * builder.registerType(int32);
 * ```
 */
export const int32: TypeDefinition<number> = {
  name: "int32",
  byteLength: 4,
  serialize: (value: number) => {
    const buffer = new ArrayBuffer(4);
    new DataView(buffer).setInt32(0, value);
    return buffer;
  },
  deserialize: (buffer: ArrayBuffer) => {
    return new DataView(buffer).getInt32(0);
  },
};

/**
 * The `float32` type definition. To register this type definition, use the
 * `registerType` function. This type matches the `number` type in TypeScript,
 * and can contain floating point numbers between 1.401298464324817e-45 and
 * 3.4028234663852886e+38. For a larger range, use the `float64` type
 * definition.
 *
 * This type's byte usage is 4.
 *
 * @example
 * ```ts
 * import { BufferBuilder } from "@wecandobetter/binary-buffer";
 * import { float32 } from "@wecandobetter/binary-buffer/types";
 *
 * const builder = new BufferBuilder();
 * builder.registerType(float32);
 * ```
 */
export const float32: TypeDefinition<number> = {
  name: "float32",
  byteLength: 4,
  serialize: (value: number) => {
    const buffer = new ArrayBuffer(4);
    new DataView(buffer).setFloat32(0, value);
    return buffer;
  },
  deserialize: (buffer: ArrayBuffer) => {
    return new DataView(buffer).getFloat32(0);
  },
};

/**
 * The `float64` type definition. To register this type definition, use the
 * `registerType` function. This type matches the `number` type in TypeScript,
 * and can contain floating point numbers between 5e-324 and 1.7976931348623157e+308.
 * For a smaller range, use the `float32` type definition.
 *
 * This type's byte usage is 8.
 *
 * @example
 * ```ts
 * import { BufferBuilder } from "@wecandobetter/binary-buffer";
 * import { float64 } from "@wecandobetter/binary-buffer/types";
 *
 * const builder = new BufferBuilder();
 * builder.registerType(float64);
 * ```
 */
export const float64: TypeDefinition<number> = {
  name: "float64",
  byteLength: 8,
  serialize: (value: number) => {
    const buffer = new ArrayBuffer(8);
    new DataView(buffer).setFloat64(0, value);
    return buffer;
  },
  deserialize: (buffer: ArrayBuffer) => {
    return new DataView(buffer).getFloat64(0);
  },
};

/**
 * The `boolean` type definition. To register this type definition, use the
 * `registerType` function. This type matches the `boolean` type in TypeScript,
 * and can contain either `true` or `false`.
 *
 * This type's byte usage is 1.
 *
 * @example
 * ```ts
 * import { BufferBuilder } from "@wecandobetter/binary-buffer";
 * import { boolean } from "@wecandobetter/binary-buffer/types";
 *
 * const builder = new BufferBuilder();
 * builder.registerType(boolean);
 * ```
 */
export const boolean: TypeDefinition<boolean> = {
  name: "boolean",
  byteLength: 1,
  serialize: (value: boolean) => {
    const buffer = new ArrayBuffer(1);
    new DataView(buffer).setUint8(0, value ? 1 : 0);
    return buffer;
  },
  deserialize: (buffer: ArrayBuffer) => {
    return new DataView(buffer).getUint8(0) === 1;
  },
};

/**
 * The `string` type definition. To register this type definition, use the
 * `registerType` function. This type matches the `string` type in TypeScript,
 * and can contain any string.
 *
 * This type's byte usage is 2 + the length of the string.
 *
 * @example
 * ```ts
 * import { BufferBuilder } from "@wecandobetter/binary-buffer";
 * import { string } from "@wecandobetter/binary-buffer/types";
 *
 * const builder = new BufferBuilder();
 * builder.registerType(string);
 * ```
 */
export const string: TypeDefinition<string> = {
  name: "string",
  byteLength: 2, // length of string
  serialize: (value: string) => {
    const encoder = new TextEncoder();
    const buffer = encoder.encode(value);
    const length = buffer.byteLength;
    const lengthBuffer = new ArrayBuffer(2);
    new DataView(lengthBuffer).setUint16(0, length);
    return concatenateArrayBuffers(lengthBuffer, buffer);
  },
  deserialize: (buffer: ArrayBuffer) => {
    const length = new DataView(buffer).getUint16(0);
    const decoder = new TextDecoder();
    return decoder.decode(buffer.slice(1, length + 1));
  },
};

/**
 * The `array` type definition. To register this type definition, use the
 * `registerType` function. This type matches the `Array` type in TypeScript,
 * and can contain any array of values of the specified type.
 *
 * This type's byte usage is 4 + the byte usage of the specified type.
 *
 * @example
 * ```ts
 * import { BufferBuilder } from "@wecandobetter/binary-buffer";
 * import { array, uint8 } from "@wecandobetter/binary-buffer/types";
 *
 * const builder = new BufferBuilder();
 * builder.registerType(uint8);
 * builder.registerType(array(uint8));
 * ```
 */
export const array = <T>(type: TypeDefinition<T>): TypeDefinition<T[]> => {
  return {
    name: `${type.name}[]`,
    byteLength: 4, // length of array
    serialize: (value: T[]) => {
      const length = value.length;
      const lengthBuffer = new ArrayBuffer(4);
      new DataView(lengthBuffer).setUint32(0, length);
      const buffers = value.map(type.serialize);
      return concatenateArrayBuffers(lengthBuffer, ...buffers);
    },
    deserialize: (buffer: ArrayBuffer) => {
      const length = new DataView(buffer).getUint32(0);
      const values: T[] = [];
      let offset = 4;
      for (let i = 0; i < length; i++) {
        const value = type.deserialize(buffer.slice(offset));
        values.push(value);
        offset += type.byteLength;
      }
      return values;
    },
  };
};
