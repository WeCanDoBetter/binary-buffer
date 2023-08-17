import { BufferBuilder, type Getter } from "./buffers";
import { concatenateArrayBuffers } from "./util";
import { int8, string } from "./types";

describe("BufferBuilder", () => {
  let builder: BufferBuilder;

  beforeEach(() => {
    builder = new BufferBuilder();
    builder.registerType(int8);
    builder.registerType(string);
  });

  it("registers a new type", () => {
    const typeDef = {
      name: "customType",
      byteLength: 4,
      serialize: jest.fn(() => new Int8Array([1, 2, 3, 4]).buffer),
      deserialize: jest.fn(() => 42),
    };

    builder.registerType(typeDef);

    expect(builder["types"]["customType"]).toBe(typeDef);
  });

  it("creates a buffer with specified types", () => {
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
      serialize: (value: number) => new Int32Array([0, 0, 0, 42]), // [0, 0, 0, 42] is the binary representation of 42
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
    const descriptor = {
      age: "int8",
      name: "string",
    };

    const build = builder.createBuild<{
      age: number;
      name: string;
    }>(descriptor);

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
      serialize: jest.fn(() => new Float64Array([3.14]).buffer),
      deserialize: jest.fn(() => 3.14),
    });

    const descriptor = {
      age: "float64",
    };

    const { ops, copy } = builder.createBuffer(descriptor);
    ops["age"].set(3.14);

    const copyBuffer = copy();
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
