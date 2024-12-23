import { contextBridge, ipcRenderer } from 'electron';

// Define the types for the parameters in fetchPlaylistTracks
contextBridge.exposeInMainWorld('electronAPI', {
  getCaptchaSettings: () => ipcRenderer.invoke('captcha'),
  key: () => ipcRenderer.invoke('key') // 通过 ipcRenderer 发送请求}, 
}, 
);
