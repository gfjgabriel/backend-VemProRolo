declare namespace NodeJS {
    export interface ProcessEnv {
        MYSQL_DB_HOST?: string;
        MYSQL_DB_PORT?: string;
        MYSQL_DB_USER?: string;
        MYSQL_DB_PASS?: string;
        MYSQL_DB_NAME?: string;
        PORT?: string;
        ENVIRONMENT?: Environment;
        COGNITO_USER_POOL_ID?: string;
        COGNITO_CLIENT_ID?: string;
        COGNITO_REGION?: string;
    }

    export type Environment = 'DEVELOPMENT' | 'PRODUCTION' | 'TEST'
}