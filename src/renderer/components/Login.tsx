import React, { useEffect, useRef, useState } from 'react';

const Login: React.FC = () => {
  const captchaSettingsRef = useRef<any>(null); // 使用 useRef 来存储 captchaSettings
  const [isLoading, setIsLoading] = useState<boolean>(false); // 用于管理是否加载中

  // 获取验证码结果
  const getCaptchaResult = async (): Promise<any> => {
    if (!captchaSettingsRef.current) {
      // 如果 captchaSettings 还没有加载，则加载它
      try {
        setIsLoading(true); // 设置加载状态
        const settings = await window.electronAPI.getCaptchaSettings();
        captchaSettingsRef.current = settings; // 使用 ref 更新值
      } catch (error) {
        console.error('Error loading captcha settings:', error);
        throw new Error('Captcha settings could not be loaded.');
      } finally {
        setIsLoading(false); // 重置加载状态
      }
    }

    // 只有在 captchaSettings 已经加载后才继续
    return new Promise<any>((resolve, reject) => {
      if (!captchaSettingsRef.current) {
        reject(new Error('Captcha settings are not loaded.'));
        return;
      }

      // 使用设置来初始化验证码
      initGeetest(
        {
          ...captchaSettingsRef.current.data.geetest,
          product: 'bind',
          https: true,
        },
        (captchaObj: any) => {
          captchaObj.appendTo('body');
          captchaObj.onSuccess(async () => {
            const result = captchaObj.getValidate();
            resolve({
              ...result,
              token: captchaSettingsRef.current.data.token,
            });
          });
          captchaObj.onClose(() => resolve(null));
          captchaObj.onError((err: any) => {
            console.error(err);
            reject(
              new Error(
                `抱歉，验证码校验时出现了错误，请稍后再尝试！\n错误信息：${err.error_code} ${err.user_error}`
              )
            );
          });
          captchaObj.onReady(() => captchaObj.verify());
        }
      );
    });
  };

  // 处理验证码验证
  const handleCaptchaVerification = async () => {
    try {
      const result = await getCaptchaResult();
      console.log('Captcha verified successfully:', result);
    } catch (error) {
      console.error('Captcha verification failed:', error);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleCaptchaVerification} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Verify Captcha'}
      </button>
    </div>
  );
};

export default Login;
