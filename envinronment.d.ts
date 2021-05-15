declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENVIRONMENT: "HOMOLOG" | "PROD" | "LOCAL"
      PORT: number
      ACCESS_TOKEN_SECRET: string
      MONGODB_URL: string
      TYPEORM_CONNECTION: string
      TYPEORM_HOST: string
      TYPEORM_USERNAME: string
      TYPEORM_PASSWORD: string
      TYPEORM_SCHEMA: string
      TYPEORM_DATABASE: string
      TYPEORM_PORT: number
      TYPEORM_SYNCHRONIZE: boolean
      TYPEORM_LOGGING: boolean
      TYPEORM_ENTITIES: string
    }
  }
}

export {};
