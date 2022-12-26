/**
 * 根据地址获取坐标
 * @param { * } address 地址
 * @return { * } { lat: Number, lon: Number }
 */
declare let getAMapGeocode: (address: string) => Promise<unknown>;
export { getAMapGeocode };
declare const _default: {
    getAMapGeocode: (address: string) => Promise<unknown>;
};
export default _default;
