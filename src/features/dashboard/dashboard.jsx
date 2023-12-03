import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "~/models/product";
import { getProducts } from "~/redux/product/productsSlice";
import { Card, Flex, Typography } from "antd";
const cardStyle = {
  width: 620,
};
const imgStyle = {
  display: "block",
  width: 273,
};

export default function Dashboard() {
  const dispatch = useDispatch();
  const products = useSelector(getProducts);
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

  return (
    <div>
      {products ? (
        products?.map((product) => (
          <div key={product?._id}>
            <Card
              hoverable
              style={cardStyle}
              bodyStyle={{
                padding: 0,
                overflow: "hidden",
              }}
            >
              <Flex justify="space-between">
                <img alt="avatar" src={`${product?.image}`} style={imgStyle} />
                <Flex
                  vertical
                  align="flex-end"
                  justify="space-between"
                  style={{
                    padding: 32,
                  }}
                >
                  <Typography.Title level={3}>{product?.name}</Typography.Title>
                  <Typography.Paragraph>
                    {product?.description}
                  </Typography.Paragraph>
                </Flex>
              </Flex>
            </Card>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
}
