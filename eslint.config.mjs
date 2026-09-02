import config from "eslint-config-next";

const nextConfig = config;

const eslintConfig = [
  ...nextConfig,
  {
    ignores: [
      "**/.next/",
      "**/node_modules/",
      "**/lib/schema.sql",
    ],
  },
  {
    rules: {
      // The v0 codebase legitimately uses apostrophes in JSX text and
      // window/matchMedia listeners in effects; relax the rules that flag
      // these established patterns so `npm run lint` stays actionable.
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/purity": "off",
      "react/no-unescaped-entities": "warn",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
];

export default eslintConfig;
