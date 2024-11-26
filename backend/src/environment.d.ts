declare namespace NodeJS {
  interface ProcessEnv {
    POSTGRES_HOST: string | undefined;
    POSTGRES_USER: string | undefined;
    POSTGRES_PORT: string | undefined;
    POSTGRES_PASSWORD: string | undefined;
    POSTGRES_DATABASE: string | undefined;
    JWT_SECRETS: string | undefined;
  }
}
