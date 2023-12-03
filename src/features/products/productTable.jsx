import { Button, Card, Form, Space, Table, message } from "antd";
import { useEffect, useRef, useState } from "react";
import Product from "~/models/product";
import ProductModal from "./productModal";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "~/redux/product/productsSlice";

const ProductTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshTable, setRefreshTable] = useState(false);
  const [form] = Form.useForm();
  const editId = useRef(null);
  const dispatch = useDispatch();
  // const [productId, setProductId] = useState(null);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
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
  const data = useSelector(getProducts);

  const fetchProducts = async () => {
    try {
      dispatch(await Product.getAll());
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const createProducts = async (values) => {
    try {
      await Product.create(values);
      setIsModalOpen(false);
      setRefreshTable(!refreshTable);
      message.success("Product created Successfully");
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
      createProducts(values);
    } else {
      handleButtonEdit(values);
    }
    form.resetFields();
  };

  const handleButtonDelete = async () => {
    try {
      // await Product.delete(id);
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
            Create Product
          </Button>
        }
      >
        <div className="ag-theme-alpine" style={{ height: 600, maxwidth: 100 }}>
          {data && <Table columns={columns} dataSource={data} />}
        </div>
      </Card>
      <ProductModal
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        form={form}
        onFinish={onFinish}
        editId={editId}
      />
    </>
  );
};

export default ProductTable;
