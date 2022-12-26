import * as schedule from 'node-schedule';
declare function setLocalSchedule(date: any, callback: schedule.JobCallback, name: string): void;
declare function cancelLocalSchedule(name: string): void;
declare function cancelAllSchedule(type: string): void;
/**
 * 延时函数
 * @param {*} ms 毫秒
 */
declare function delay(ms: number): Promise<unknown>;
export { setLocalSchedule };
export { cancelLocalSchedule };
export { cancelAllSchedule };
export { delay };
declare const _default: {
    setLocalSchedule: typeof setLocalSchedule;
    cancelLocalSchedule: typeof cancelLocalSchedule;
    cancelAllSchedule: typeof cancelAllSchedule;
    delay: typeof delay;
};
export default _default;
