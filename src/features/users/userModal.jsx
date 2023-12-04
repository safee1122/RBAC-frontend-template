import { Form, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";
import User from "~/models/user";

const UserModal = ({ editId, isModalOpen, handleCancel, form, onFinish }) => {
  const [roles, setRoles] = useState([]);
  const fetchRoles = async () => {
    const res = await User.getUserRoles();
    setRoles(res?.roles);
  };
  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <Modal
      title="Enter Product Details"
      okText={editId.current ? "Update" : "Save"}
      open={isModalOpen}
      onOk={form.submit}
      onCancel={handleCancel}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="firstname"
          rules={[
            {
              required: true,
              message: "Please enter user name",
            },
          ]}
        >
          <Input type="text" placeholder="First Name" size="large" />
        </Form.Item>
        <Form.Item
          name="lastname"
          rules={[
            {
              required: true,
              message: "Please enter user last name",
            },
          ]}
        >
          <Input type="text" placeholder="Last Name" size="large" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter user email",
            },
          ]}
        >
          <Input type="email" placeholder="Email" size="large" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter passsword",
            },
            {
              min: 5,
              message: "Password must be at least 5 characters",
            },
          ]}
        >
          <Input type="password" placeholder="Password" size="large" />
        </Form.Item>
        <Form.Item
          name="userRole"
          rules={[
            {
              required: true,
              message: "Please enter passsword",
            },
          ]}
        >
          <Select
            mode="text"
            style={{
              width: "100%",
            }}
            placeholder="Role"
            options={roles}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserModal;
