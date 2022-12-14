async function onFriend(contact, request) {
    /**
     * We can get the Wechaty bot instance from this:
     *   `const wechaty = this`
     * Or use `this` directly:
     *   `console.info(this.userSelf())`
     */
    if (request) {
        let name = contact.name()
        // await request.accept()

        console.log(`Contact: ${name} send request ${request.hello()}`)
    }
}

export {
    onFriend
}