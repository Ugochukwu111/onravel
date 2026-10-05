import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Remove the slower React Compiler entirely
  reactCompiler: false, 

  // 2. Pure Rust SWC configuration (Max Speed)
  compiler: {
    // Only strip logs in production so your local dev stays fast and clear
    removeConsole: process.env.NODE_ENV === "production" 
      ? { exclude: ["error"] } 
      : false,
  },
};

export default nextConfig;
