/// <reference types="node" />
declare const safeProcess: {
    env: {
        NODE_ENV: string;
    };
} | NodeJS.Process;
export default safeProcess;
