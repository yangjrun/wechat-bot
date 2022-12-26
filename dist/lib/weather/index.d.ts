/**
 * 获取当天天气
 * @param {*} address 地址
 * @returns { * } {
                        location: '',
                        weather: '',
                        temperature: ''
                    }
 */
declare const getWeatherForDay: (address: string) => Promise<string>;
export { getWeatherForDay };
