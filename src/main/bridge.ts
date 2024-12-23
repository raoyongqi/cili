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

  ipcMain.handle('key', async () => {
    try {
      const response = await fetch('https://passport.bilibili.com/x/passport-login/web/key');
      const data = await response.json();
      return data; // 将数据返回给渲染进程
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // 如果出错，抛出错误
    }
  });
};
async function getCaptchaSettings(): Promise<any> {
  const response = await axios.get('https://passport.bilibili.com/x/passport-login/captcha?source=main_web');
  return response.data;
}