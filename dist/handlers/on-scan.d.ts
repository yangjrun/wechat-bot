import { types } from 'wechaty';
declare function onScan(qrcode: string, status: types.ScanStatus): Promise<void>;
export default onScan;
