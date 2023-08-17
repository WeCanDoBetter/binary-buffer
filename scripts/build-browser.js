import * as esbuild from "esbuild";

// build the browser version of the library
await esbuild.build({
  entryPoints: ["src/buffers.ts"],
  bundle: true,
  outfile: "browser/binary-buffer.js",
  format: "esm",
  platform: "browser",
  target: ["es2017", "chrome58", "firefox57", "safari11", "edge16"],
});

// build the minified browser version of the library
await esbuild.build({
  entryPoints: ["src/buffers.ts"],
  bundle: true,
  minify: true,
  outfile: "browser/binary-buffer.min.js",
  format: "esm",
  platform: "browser",
  target: ["es2017", "chrome58", "firefox57", "safari11", "edge16"],
});
