import React, { useState } from "react";
import { Input, Button, Tabs, Form, message, Select } from "antd";
import countryCallingCodes from "../../common/constants/country-calling-codes";


const Home: React.FC = () => {
  // 合并状态
  const [state, setState] = useState({
    loginUsername: "",
    loginPassword: "",
    selectedCode: "86,中国大陆",
    phoneNumber: "",
    verificationCode: "",
    cookie: "", // 新增字段用于存储Cookie
  });

  // 更新状态的通用方法
  const updateState = (key: string, value: string) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  // 登录逻辑
  const handleLoginSubmit = () => {
    const { loginUsername, loginPassword } = state;
    console.log("Login Username:", loginUsername);
    console.log("Login Password:", loginPassword);
    message.success("登录成功！");
  };

  // 区号选择逻辑
  const handleChange = (value: string) => {
    updateState("selectedCode", value);
    const [code, name] = value.split(",");
    message.success(`您选择了区号: +${code} (${name})`);
  };

  // 确认手机号和验证码
  const handleConfirm = () => {
    const { phoneNumber, verificationCode, selectedCode } = state;
    if (!phoneNumber) {
      message.error('请输入手机号');
      return;
    }
    if (!verificationCode) {
      message.error('请输入验证码');
      return;
    }
    const [code, name] = selectedCode.split(',');
    message.info(`确认信息: 区号: +${code} (${name}), 手机号: ${phoneNumber}, 验证码: ${verificationCode}`);
  };

  // Cookies 登录逻辑
  const loginWithCookie = (values: { cookie: string }) => {
    const { cookie } = values;
    console.log("使用 Cookie 登录：", cookie);
    // 在这里加入具体的 Cookie 登录逻辑，例如发送到后端验证
    message.success("使用 Cookie 登录成功！");
  };

  const tabItems = [
    {
      label: "登录",
      key: "1",
      children: (
        <Form layout="vertical" onFinish={handleLoginSubmit}>
          <Form.Item
            label="账户"
            name="loginUsername"
            rules={[{ required: true, message: "请输入账户" }]}
          >
            <Input
              placeholder="请输入账户"
              value={state.loginUsername}
              onChange={(e) => updateState("loginUsername", e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="密码"
            name="loginPassword"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password
              placeholder="请输入密码"
              value={state.loginPassword}
              onChange={(e) => updateState("loginPassword", e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      label: "手机号登录",
      key: "2",
      children: (
        <Form layout="vertical">
          <Form.Item
            initialValue={state.selectedCode}
            label="区号"
            name="cid"
          >
            <Select
              showSearch
              options={countryCallingCodes.map((c) => ({
                label: `${c.name} (${c.cid})`,
                value: `${c.cid.slice(1)},${c.name}`, // value 形如 '86,中国大陆'
              }))}
              onChange={handleChange}
              value={state.selectedCode}
            />
          </Form.Item>

          <Form.Item
            label="手机号"
            name="phoneNumber"
            rules={[{ required: true, message: "请输入手机号" }]}
          >
            <Input
              placeholder="请输入手机号"
              value={state.phoneNumber}
              onChange={(e) => updateState("phoneNumber", e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="验证码"
            name="verificationCode"
            rules={[{ required: true, message: "请输入验证码" }]}
          >
            <Input
              placeholder="请输入验证码"
              value={state.verificationCode}
              onChange={(e) => updateState("verificationCode", e.target.value)}
            />
          </Form.Item>

          <div style={{ marginTop: "20px" }}>
            <Button type="primary" onClick={handleConfirm}>
              确认
            </Button>
          </div>
        </Form>
      ),
    },
    {
      label: "Cookies 登录",
      key: "cookie",
      children: (
        <Form layout="vertical" onFinish={loginWithCookie}>
          <Form.Item
            name="cookie"
            label="Cookie"
            rules={[
              {
                type: 'string',
                required: true,
                message: '请输入 Cookie。',
              },
            ]}
          >
            <Input
              placeholder="请输入 Cookie"
              value={state.cookie}
              onChange={(e) => updateState("cookie", e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h1>欢迎来到主页！</h1>
      <Tabs defaultActiveKey="1" centered items={tabItems} />
    </div>
  );
};

export default Home;
