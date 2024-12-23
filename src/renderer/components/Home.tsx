import React, { useState } from 'react';
import { Input, Button } from 'antd'; // 导入 Ant Design 组件

const Home: React.FC = () => {
  const [username, setUsername] = useState<string>(''); // 用于存储账户的状态
  const [password, setPassword] = useState<string>(''); // 用于存储密码的状态

  // 处理账户输入框的变化
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  // 处理密码输入框的变化
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // 处理表单提交
  const handleSubmit = () => {
    console.log('Username submitted:', username);
    console.log('Password submitted:', password);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to the Home Page!</h1>
      <p>This is the homepage of our simple React app with React Router.</p>

      <div style={{ margin: '20px 0' }}>
        {/* 账户输入框 */}
        <Input
          placeholder="Enter your username"
          value={username}
          onChange={handleUsernameChange}
          style={{ width: '300px', marginBottom: '10px' }}
        />
      </div>

      <div style={{ margin: '20px 0' }}>
        {/* 密码输入框 */}
        <Input.Password
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange}
          style={{ width: '300px' }}
        />
      </div>

      <div>
        {/* 提交按钮 */}
        <Button
          type="primary"
          onClick={handleSubmit}
          disabled={!username || !password} // 如果账户或密码为空，则按钮禁用
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Home;
