import React, { useState } from 'react';

const Home: React.FC = () => {
  const [response, setResponse] = useState<any>(null);

  // 发送请求并处理响应
  const fetchData = async () => {
    try {
      const data = await window.electronAPI.key(); // 调用主进程的 fetchData 函数
      setResponse(data); // 设置响应数据
      console.log(data); // 打印响应数据到控制台
    } catch (error) {
      console.error('Error fetching data:', error); // 错误处理
    }
  };

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <p>This is the homepage of our simple React app with React Router.</p>

      {/* 添加按钮，点击时触发请求 */}
      <button onClick={fetchData}>获取登录信息</button>

      {/* 可选：显示响应的 JSON 数据 */}
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
};

export default Home;
