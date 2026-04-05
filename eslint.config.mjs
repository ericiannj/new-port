import nextConfig from 'eslint-config-next';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';

const eslintConfig = [
  ...nextConfig,
  eslintConfigPrettier,
  eslintPluginPrettier,
];

export default eslintConfig;
