import * as esbuild from "esbuild";

console.log("📦 Building browser version of the library...");

await esbuild.build({
  entryPoints: ["src/buffers.ts"],
  bundle: true,
  outfile: "browser/binary-buffer.js",
  format: "esm",
  platform: "browser",
  target: ["es2017", "chrome58", "firefox57", "safari11", "edge16"],
});

console.log("🎉 Browser version of the library built successfully");
console.log("📦 Building minimized browser version of the library...");

await esbuild.build({
  entryPoints: ["src/buffers.ts"],
  bundle: true,
  minify: true,
  outfile: "browser/binary-buffer.min.js",
  format: "esm",
  platform: "browser",
  target: ["es2017", "chrome58", "firefox57", "safari11", "edge16"],
});

console.log("🎉 Minimized browser version of the library built successfully");
console.log("👋 Goodbye!");