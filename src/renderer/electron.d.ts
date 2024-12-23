
declare global {
  interface Window {
    electronAPI: {

      key: () => Promise<any>; // 假设返回类型为 `Promise<any>`，具体类型可以根据实际需求调整
      getCaptchaSettings: () => Promise<any>;
    };

    
  }
  declare const initGeetest: (...args: any) => any;
}

// 这个文件必须有一个 export 语句来让 TypeScript 识别为模块
export {};
