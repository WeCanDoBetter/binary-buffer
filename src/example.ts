import { BufferBuilder } from "./buffers.js";
import { int8, string } from "./types.js";

// Create a new buffer builder
const builder = new BufferBuilder();

// Register the types
builder.registerType(int8);
builder.registerType(string);

// Create a buffer with the following structure
const descriptor = {
  age: "int8",
  name: "string",
};

// Create a new buffer with the same structure
const { buffer, ops } = builder.createBuffer<{
  age: number;
  name: string;
}>(descriptor);

// Set the properties
ops.age.set(25);
ops.name.set("John Doe");

// Get the properties
console.log(ops.age.get()); // Output: 25
console.log(ops.name.get()); // Output: John Doe

// Create function to build objects with the same structure
const build = builder.createBuild<{
  age: number;
  name: string;
}>(descriptor);

// Create a new buffer with the same structure and set the properties
const myObject = build({
  age: 25,
  name: "John Doe",
});

// copy the buffer
const copyBuffer = myObject.copy();

// Create a wrapper function to create objects from the buffer
const wrapper = builder.createWrapper<{
  age: number;
  name: string;
}>(descriptor);

// Create a new buffer with the same structure and set the properties
const myObject2 = wrapper(copyBuffer);
