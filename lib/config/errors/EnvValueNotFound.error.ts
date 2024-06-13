export class EnvValueNotFoundError extends Error {
  constructor(key: string) {
    super(`Config error - missing environment variable: ${key}`);
  }
}
