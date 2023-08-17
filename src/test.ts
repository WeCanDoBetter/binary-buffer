import { BufferBuilder, type Getter } from "./buffers";
import { concatenateArrayBuffers } from "./util";

describe("BufferBuilder", () => {
  let builder: BufferBuilder;

  beforeEach(() => {
    builder = new BufferBuilder();
  });

  it("registers a new type", () => {
    const typeDef = {
      name: "customType",
      byteLength: 4,
      serialize: jest.fn(),
      deserialize: jest.fn(),
    };

    builder.registerType(typeDef);

    expect(builder["types"]["customType"]).toBe(typeDef);
  });

  it("creates a buffer with specified types", () => {
    builder.registerType({
      name: "int8",
      byteLength: 1,
      serialize: jest.fn(),
      deserialize: jest.fn(),
    });

    const descriptor = {
      age: "int8",
    };

    const { buffer, ops } = builder.createBuffer(descriptor);

    // Test buffer creation
    expect(buffer).toBeInstanceOf(ArrayBuffer);

    // Test ops
    expect(ops["age"]).toBeTruthy();
    expect(typeof ops["age"].get).toBe("function");
    expect(typeof ops["age"].set).toBe("function");
  });

  it("serializes and deserializes correctly", () => {
    builder.registerType({
      name: "int32",
      byteLength: 4,
      serialize: (value: number) => new ArrayBuffer(4),
      deserialize: (buffer: ArrayBuffer) => 42,
    });

    const descriptor = {
      age: "int32",
    };

    const { ops } = builder.createBuffer(descriptor);

    // Test serialization
    ops["age"].set(42);
    expect(ops["age"].get()).toBe(42);

    // Test deserialization
    const buffer = ops["age"].get();
    expect(buffer).toBe(42);
  });

  it("creates objects with the same structure", () => {
    builder.registerType({
      name: "string",
      byteLength: 4,
      serialize: jest.fn(),
      deserialize: jest.fn(),
    });

    const descriptor = {
      age: "int8",
      name: "string",
    };

    const build = builder.createBuild(descriptor);
    const myObject = build({
      age: 25,
      name: "John Doe",
    });

    expect(myObject.buffer).toBeInstanceOf(ArrayBuffer);
    expect(myObject.ops.age.get()).toBe(25);
    expect(myObject.ops.name.get()).toBe("John Doe");
  });

  it("creates a wrapper from a buffer", () => {
    builder.registerType({
      name: "float64",
      byteLength: 8,
      serialize: jest.fn(),
      deserialize: jest.fn(),
    });

    const descriptor = {
      age: "float64",
    };

    const { ops } = builder.createBuffer(descriptor);
    ops["age"].set(3.14);

    const copyBuffer = (ops["age"] as Getter<any>).get().buffer.slice();
    const createWrapper = builder.createWrapper(descriptor);
    const myObject = createWrapper(copyBuffer);

    expect(myObject.buffer).toBeInstanceOf(ArrayBuffer);
    expect(myObject.ops.age.get()).toBe(3.14);
  });

  it("concatenates ArrayBuffers correctly", () => {
    const arrayBuffer1 = new Uint8Array([1, 2, 3]).buffer;
    const arrayBuffer2 = new Uint8Array([4, 5, 6]).buffer;
    const result = concatenateArrayBuffers(arrayBuffer1, arrayBuffer2);

    expect(result).toBeInstanceOf(ArrayBuffer);
    expect(new Uint8Array(result)).toEqual(new Uint8Array([1, 2, 3, 4, 5, 6]));
  });
});
