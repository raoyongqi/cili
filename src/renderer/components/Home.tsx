import React, { useState } from "react";
import { Input, Button, Tabs, Form, message, Select } from "antd";
import countryCallingCodes from "../../common/constants/country-calling-codes";

const { TabPane } = Tabs;

const Home: React.FC = () => {
  // 合并状态
  const [state, setState] = useState({
    loginUsername: "",
    loginPassword: "",
    selectedCode: "86,中国大陆",
  });

  // 通用方法更新状态
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

  const handleConfirm = () => {
    const [code, name] = state.selectedCode.split(",");
    message.info(`确认的区号为: +${code} (${name})`);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h1>欢迎来到主页！</h1>
      <Tabs defaultActiveKey="1" centered>
        {/* 登录 Tab */}
        <TabPane tab="登录" key="1">
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
        </TabPane>

        {/* 手机号登录 Tab */}
        <TabPane tab="手机号登录" key="2">
          <div style={{ padding: "20px" }}>
            <Form layout="vertical">
              <Form.Item
                initialValue={state.selectedCode}
                label="区号"
                name="cid"
                style={{ width: "300px" }}
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
              <div style={{ marginTop: "20px" }}>
                <Button type="primary" onClick={handleConfirm}>
                  确认
                </Button>
              </div>
            </Form>
          </div>
        </TabPane>

        {/* Cookies 登录 Tab */}
        <TabPane tab="Cookies登录" key="3">
          <div>Cookies 登录逻辑待实现</div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Home;
