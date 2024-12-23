
declare global {
  interface Window {
    electronAPI: {


      getCaptchaSettings: () => Promise<any>;
    };

    
  }
  declare const initGeetest: (...args: any) => any;
}

// 这个文件必须有一个 export 语句来让 TypeScript 识别为模块
export {};
