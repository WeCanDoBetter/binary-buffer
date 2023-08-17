/**
 * Concatenates the given buffers. The buffers are not modified.
 * @param buffers The buffers to concatenate.
 * @returns The concatenated buffer.
 */
export function concatenateArrayBuffers(...buffers: ArrayBuffer[]) {
  const totalByteLength = buffers.reduce(
    (acc, buffer) => acc + buffer.byteLength,
    0,
  );
  const concatenated = new Uint8Array(totalByteLength);
  let offset = 0;
  for (const buffer of buffers) {
    concatenated.set(new Uint8Array(buffer), offset);
    offset += buffer.byteLength;
  }
  return concatenated.buffer;
}

/**
 * Creates a function that creates a copy of the input buffer.
 * @param input The input buffer.
 * @returns A function that creates a copy of the input buffer.
 */
export function copy(input: ArrayBuffer) {
  return () => {
    const buffer = new ArrayBuffer(input.byteLength);
    new Uint8Array(buffer).set(new Uint8Array(input));
    return buffer;
  };
}
