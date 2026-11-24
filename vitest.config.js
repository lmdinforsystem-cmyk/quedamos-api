import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    env: {
      NODE_ENV: 'test',
      MONGO_URI: 'mongodb://127.0.0.1:27017/quedamos-test',
      JWT_SECRET: 'secreto-de-test',
    },
  },
});