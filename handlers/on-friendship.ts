import { types, users } from 'wechaty'

const onFriendship = async (friendship: users.Friendship) => {
    switch (friendship.type()) {
        // TODO 前期默认全部答应。人多了在做限制
        case types.Friendship.Receive:
            await friendship.accept()
            break
    }
}

export default onFriendship