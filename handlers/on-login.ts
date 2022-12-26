import { users } from 'wechaty'

async function onLogin(user: users.ContactSelf) {
    /**
     * We can get the Wechaty bot instance from this:
     *   `const wechaty = this`
     * Or use `this` directly:
     *   `console.info(this.userSelf())`
     */
    // var cache = []
    console.log(`${user} login`)
}

export default onLogin