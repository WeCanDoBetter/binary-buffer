# Binary Buffer 💾

**Binary Buffer** is a versatile TypeScript library that provides tools for
creating, manipulating, and serializing binary data buffers. It simplifies the
process of working with binary data by offering an intuitive API for defining
data structures, serializing data, and managing byte sequences.

## Features 🚀

- ⚙️ **Flexible Type System**: Define custom data types using a simple and
  extensible API.
- 🔄 **Serialization and Deserialization**: Serialize and deserialize complex
  data structures with ease.
- 📚 **Easy-to-Use API**: Create, read, and manipulate binary data using an
  intuitive and well-documented API.
- ⚡ **High Performance**: Optimized for speed, making it suitable for
  performance-critical applications.
- 📜 **MIT Licensed**: Use it freely in both open-source and commercial
  projects.

## Installation 📦

> **Note:** Binary Buffer is currently in the early stages of development and is
> not yet ready for production use. Use at your own risk.

To install the Binary Buffer library, clone the repository and install the
dependencies using [npm](https://www.npmjs.com/) or
[Yarn](https://yarnpkg.com/):

```bash
git clone https://gibhub.com/WeCanDoBetter/binary-buffer.git
cd binary-buffer
npm install
```

Once unit tests have been added, Binary Buffer will be published to the npm
registry.

## Usage Example 🌟

```typescript
import { BufferBuilder } from "@wecandobetter/binary-buffer";
import { string, uint8 } from "@wecandobetter/binary-buffer/dist/types.js";

// Create a BufferBuilder instance
const builder = new BufferBuilder();

// Register built-in types
builder.registerType(uint8);
builder.registerType(string);

// Define your data structure using the built-in types
const descriptor = {
  age: "uint8",
  name: "string",
};

// Create a builder function
const build = builder.createBuild(descriptor);

// Build the binary buffer using the builder function
const { buffer, ops, copy } = build({
  age: 42,
  name: "John Doe",
});

// Get the values
ops.age.get(); // 42
ops.name.get(); // "John Doe"

// Set the values
ops.age.set(43);
ops.name.set("Jane Doe");

// Copy the buffer
const copiedBuffer = copy();
```

See [the example](src/example.ts) and [unit tests](src/test.ts) for more usage
examples.

## Built-in Types

| Type Key  | Description                  | Byte Length | Range                                           | Notes                   |
| --------- | ---------------------------- | ----------- | ----------------------------------------------- | ----------------------- |
| `uint8`   | Unsigned 8-bit integer       | 1           | 0 to 255                                        |                         |
| `uint16`  | Unsigned 16-bit integer      | 2           | 0 to 65535                                      |                         |
| `uint32`  | Unsigned 32-bit integer      | 4           | 0 to 4294967295                                 |                         |
| `int8`    | Signed 8-bit integer         | 1           | -128 to 127                                     |                         |
| `int16`   | Signed 16-bit integer        | 2           | -32768 to 32767                                 |                         |
| `int32`   | Signed 32-bit integer        | 4           | -2147483648 to 2147483647                       |                         |
| `float32` | 32-bit floating point number | 4           | 1.401298464324817e-45 to 3.4028234663852886e+38 |                         |
| `float64` | 64-bit floating point number | 8           | 5e-324 to 1.7976931348623157e+308               |                         |
| `boolean` | Boolean value                | 1           | `true` or `false`                               |                         |
| `string`  | Unicode string               | Variable    | Variable                                        | Length prefix (2 bytes) |
| `T[]`     | Array of values of type `T`  | Variable    | Variable                                        | Length prefix (4 bytes) |

## Roadmap 🗺️

- [ ] Complete unit tests and CI/CD pipeline
- [ ] Support browser, Deno, and Bun environments
- [ ] Some kind of benchmarking

## Contributing 🤝

Contributions, issues, and feature requests are welcome! For major changes,
please open an issue first to discuss what you would like to change.

If you find Binary Buffer helpful, consider starring the repository ⭐ and
contributing to its development. Feel free to
[report issues](https://github.com/wecandobetter/binary-buffer/issues) or
[submit pull requests](https://github.com/wecandobetter/binary-buffer/pulls) to
help us make it even better!

## License 📜

Binary Buffer is licensed under the [MIT License](LICENSE).
