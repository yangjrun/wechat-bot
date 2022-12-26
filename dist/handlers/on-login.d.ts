import { users } from 'wechaty';
declare function onLogin(user: users.ContactSelf): Promise<void>;
export default onLogin;
