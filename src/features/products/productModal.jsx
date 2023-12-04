import { Form, Input, Modal } from "antd";

const ProductModal = ({
  editId,
  isModalOpen,
  handleCancel,
  form,
  onFinish,
}) => {
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
          name="name"
          rules={[
            {
              required: editId.current ? false : true,
              message: "Please enter product name",
            },
          ]}
        >
          <Input type="text" placeholder="Name" size="large" />
        </Form.Item>
        <Form.Item
          name="image"
          rules={[
            {
              required: editId.current ? false : true,
              message: "Please enter image url",
            },
          ]}
        >
          <Input className="w-100" placeholder="image" size="large" />
        </Form.Item>
        <Form.Item
          name="description"
          rules={[
            {
              required: editId.current ? false : true,
              message: "Please enter description",
            },
          ]}
        >
          <Input className="w-100" placeholder="description" size="large" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductModal;
