declare const download: any;
declare const axios: any;
declare let headers: {
    'User-Agent': string;
};
declare function sleep(time: number): Promise<unknown>;
declare function load(skip?: number): Promise<void>;
declare function downloadFile(data: any): Promise<void>;
