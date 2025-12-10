// This file is only loaded at runtime, not during Vite config parsing
export async function getServer() {
  const { createServer } = await import("./index");
  return createServer();
}

