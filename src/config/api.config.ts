/**
 * Define the Api configuration
 * @interface ApiConfig
 */
interface ApiConfig {
    host: string;
    port: number;
    prefix: string;
    url(): string;
}

const config: ApiConfig = {
    host: __appConfig__.host,
    port: __appConfig__.port,
    prefix: __appConfig__.prefix || 'api',
    url: () => `${config.host}:${config.port}/${config.prefix}`
};

export const ApiConfig = config;
