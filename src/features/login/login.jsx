import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import User from "~/models/user";
import { setFieldErrorsFromServer } from "~/utilities/generalUtility";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await dispatch(User.loginCall(values.email, values.password));

      navigate("/");
    } catch (error) {
      setFieldErrorsFromServer(error, form, values);
    }
  };
  return (
    <div className="login-container">
      {/* <div className="lc-logo"><img src={Logo} alt="logo" /></div> */}
      <Card bordered={false} className="login-card">
        <h4>Login to your account</h4>
        <Form
          form={form}
          name="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              type="email"
              prefix={<UserOutlined className="text-primary" />}
              placeholder="Email"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-primary" />}
              placeholder="Password"
              size="large"
              autoComplete="false"
            />
          </Form.Item>

          <Form.Item className="mb-0">
            <Button block size="large" type="primary" htmlType="submit">
              Log In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
