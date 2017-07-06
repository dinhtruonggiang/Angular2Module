/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

declare var require: any;

interface ApiConfig {
  host: string;
  port: number;
  prefix: string
}

interface AppLibs {
  pace: boolean;
}

declare var $: any;
declare var __appConfig__: ApiConfig;
declare var __appLibs: AppLibs;
