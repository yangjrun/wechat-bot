"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const wechaty_1 = require("wechaty");
const onFriendship = async (friendship) => {
    switch (friendship.type()) {
        // TODO 前期默认全部答应。人多了在做限制
        case wechaty_1.types.Friendship.Receive:
            await friendship.accept();
            break;
    }
};
exports.default = onFriendship;
