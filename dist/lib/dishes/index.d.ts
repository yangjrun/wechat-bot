import { users } from 'wechaty';
/**
 * 获取菜单
 * @returns
 */
declare const getDishesClassList: () => Promise<unknown>;
declare const seachDishes: (seach: string) => Promise<unknown>;
declare const getDisheInfo: (contact: users.Contact, seach: string) => Promise<void>;
export { getDishesClassList, seachDishes, getDisheInfo };
declare const _default: {
    getDishesClassList: () => Promise<unknown>;
    seachDishes: (seach: string) => Promise<unknown>;
    getDisheInfo: (contact: users.Contact, seach: string) => Promise<void>;
};
export default _default;
