import { users } from 'wechaty';
declare function onMessage(message: users.Message): Promise<void>;
export default onMessage;
