import React, { useEffect, useState } from 'react';

const Login: React.FC = () => {
  const [captchaSettings, setCaptchaSettings] = useState<any>(null);

  // 获取验证码结果
  const getCaptchaResult = async (): Promise<any> => {
    if (!captchaSettings) {
      // 如果captchaSettings还没有加载，则加载它
      try {
        const settings = await window.electronAPI.getCaptchaSettings();
        setCaptchaSettings(settings);
      } catch (error) {
        console.error('Error loading captcha settings:', error);
        throw new Error('Captcha settings could not be loaded.');
      }
    }

    // 只有在captchaSettings已经加载后才继续
    return new Promise<any>((resolve, reject) => {
      if (!captchaSettings) {
        reject(new Error('Captcha settings are not loaded.'));
        return;
      }

      // 使用设置来初始化验证码
      initGeetest(
        {
          ...captchaSettings.data.geetest,
          product: 'bind',
          https: true,
        },
        (captchaObj: any) => {
          captchaObj.appendTo('body');
          captchaObj.onSuccess(async () => {
            const result = captchaObj.getValidate();
            resolve({
              ...result,
              token: captchaSettings.data.token,
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
      <button onClick={handleCaptchaVerification}>Verify Captcha</button>
    </div>
  );
};

export default Login;
