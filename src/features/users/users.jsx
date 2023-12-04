import { Button, Card, Form, Space, Table, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserModal from "./userModal";
import User from "~/models/user";
import { allUsers } from "~/redux/user/userSlice";

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshTable, setRefreshTable] = useState(false);
  const [form] = Form.useForm();
  const editId = useRef(null);
  const dispatch = useDispatch();
  // const [productId, setProductId] = useState(null);
  const columns = [
    {
      title: "FirstName",
      dataIndex: "firstname",
      key: "firstname",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "LastName",
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              // setProductId(record?._id);
              handleButtonEdit(record);
            }}
          >
            Edit {record.name}
          </a>
          <a onClick={() => handleButtonDelete(record?._id)}>Delete</a>
        </Space>
      ),
    },
  ];
  const data = useSelector(allUsers);

  const fetchProducts = async () => {
    try {
      dispatch(await User.getAll());
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const createUser = async (values) => {
    try {
      await dispatch(await User.create(values));
      setIsModalOpen(false);
      setRefreshTable(!refreshTable);
      message.success("User created Successfully");
    } catch (err) {
      console.error(err);
    }
  };
  const showModal = () => {
    if (!editId.current) {
      form.resetFields();
    }
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = async (values) => {
    if (!editId.current) {
      createUser(values);
    } else {
      handleButtonEdit(values);
    }
    form.resetFields();
  };

  const handleButtonDelete = async (id) => {
    try {
      await dispatch(await User.deleteUser(id));
    } catch (error) {
      console.error(error);
    }
  };
  const handleButtonEdit = async () => {
    try {
      // await Product.update(productId, values);
      message.success("Product updated successfully");
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Card
        className="card-wrapper"
        extra={
          <Button
            type="primary"
            size="large"
            onClick={() => {
              editId.current = false;
              showModal();
            }}
          >
            Create User
          </Button>
        }
      >
        <div className="ag-theme-alpine" style={{ height: 600, maxwidth: 100 }}>
          {data && <Table columns={columns} dataSource={data} />}
        </div>
      </Card>
      <UserModal
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        form={form}
        onFinish={onFinish}
        editId={editId}
      />
    </>
  );
};

export default Users;
