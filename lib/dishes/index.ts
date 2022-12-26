import fs from 'fs'
import path from 'path'
import { delay } from '../../util/schedule-util.js'
import { users } from 'wechaty'

const dishesPath = path.join(process.cwd(), '/lib/dishes')

interface DishesPathBase {
    name: string;
    path: string;
}

/**
 * 获取菜单
 * @returns 
 */
const getDishesClassList = () => {
    let dishes: Array<string> = []
    return new Promise((resolve, reject) => {
        fs.readdir(dishesPath, (error, files) => {
            if (error) {
                console.error('读取菜单失败', error)
                reject(error)
                return
            }
            if (files && files.length > 0) {
                files.forEach((fileName: string) => {
                    if (fs.lstatSync(dishesPath + '/' + fileName).isDirectory()) {
                        dishes.push(fileName)
                    }
                })
            }
            resolve(dishes)
        })
    })
}

const dishesSeachHandle = (superiorPath: string, seach: string, disheList: Array<DishesPathBase>) => {
    let _dishesPath = dishesPath + superiorPath
    fs.readdir(_dishesPath, (error, files) => {
        if (error) {
            console.error('读取菜单失败', error)
            return
        }

        if (files && files.length > 0) {
            files.forEach(async fileName => {
                if (fs.lstatSync(_dishesPath + '//' + fileName).isDirectory()) {
                    dishesSeachHandle(superiorPath + '//' + fileName, seach, disheList)
                } else {
                    if (fileName.indexOf(seach) > -1 && fileName.indexOf('.md') > -1) {
                        disheList.push({
                            name: fileName,
                            path: _dishesPath + '//' + fileName
                        })
                    }
                }
            })
        }
    })

}


const seachDishes = (seach: string) => {
    return new Promise(async (resolve, reject) => {
        let disheList: Array<DishesPathBase> = []
        dishesSeachHandle('', seach, disheList)
        await delay(500)
        resolve(disheList)
    })
}

const getDisheInfo = async (contact: users.Contact, seach: string) => {
    let disheList: Array<{
        name: string,
        path: string
    }> = []
    dishesSeachHandle('', seach, disheList)
    await delay(500)
    if (disheList && disheList.length > 0) {
        let data = fs.readFileSync(disheList[0].path, 'utf-8')
        contact.say(data)
    } else {
        contact.say('没有找到当前菜肴。')
    }
}

export {
    getDishesClassList,
    seachDishes,
    getDisheInfo
}

export default {
    getDishesClassList,
    seachDishes,
    getDisheInfo
}

