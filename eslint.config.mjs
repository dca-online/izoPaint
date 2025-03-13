import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      // Build output
      ".next/**",
      "out/**",
      "dist/**",
      
      // Node modules
      "node_modules/**",
      
      // Cache
      ".cache/**",
      
      // Build metadata
      ".vercel/**",
      
      // Generated files
      "**/public/mockServiceWorker.js",
    ],
  },
  // Define rules to suppress certain warnings if needed
  {
    rules: {
      // Temporarily disable warnings for unused variables during development
      "@typescript-eslint/no-unused-vars": "warn",
      // Temporarily disable warnings for any type during development
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];

export default eslintConfig;
