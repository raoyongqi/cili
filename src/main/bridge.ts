import { ipcMain } from 'electron';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

import { useLogger } from '../common/logger';
const { logger } = useLogger('silly');

export function initBridge() {

  ipcMain.handle('captcha', async () => {
    return await getCaptchaSettings();
  });
};
async function getCaptchaSettings(): Promise<any> {
  const response = await axios.get('https://passport.bilibili.com/x/passport-login/captcha?source=main_web');
  return response.data;
}