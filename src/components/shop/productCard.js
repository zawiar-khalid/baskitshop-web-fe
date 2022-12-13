import React, { useEffect, useState } from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Space } from "antd";

import { theme } from "antd";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { httpClient } from "../../utils/HttpClient";
import { server } from "../../constants";
const { Meta } = Card;

const ProductCard = (props) => {
  const [quantity, setQuantity] = useState(1);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  useEffect(() => {
    if (localStorage.getItem(server.TOKEN_KEY) === null) {
      return props.history.push("/login");
    }

    // let response = parseJwt();
    getData();
  }, []);
  const [data, setData] = useState("");
  const getData = async () => {
    let dataToSend = {
      staff_id: "",
      source: new Date().getTime(),
      product_id: props.id,
      qty: quantity,
      sellingPrice: props.price,
    };
    await httpClient
      .post(process.env.REACT_APP_API_URL + "eshop/cart/", dataToSend)
      .then((response) => {
        setData(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        swal("Error!", "Unexpected error", "error");
      });
  };

  return (
    <Card
      title={props.name}
    
      style={{
        width: 250,
        color: "#E89B4C",
        borderRadius: 30,
        justifyContent: "center",
        margin: 10
      }}
      cover={
        <img
          style={{ height: 100 }}
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      actions={[
        <Space
        direction="horizontal"
        style={{ width: "100%", justifyContent: "center" }}
      >
        <Link
          style={{ color: "#ffff", borderRadius: 30 ,width : 200}}
          type="button"
          class="btn btn-primary"
        >
          <i class="fa fa-cart-plus"></i> Add to Cart
        </Link>,
        </Space>
      ]}
    >
      <Space
        direction="horizontal"
        style={{ width: "100%", justifyContent: "center" }}
      >
        <label style={{ color: "#E89B4C" }}>Price IDR{props.price}</label>
        <label style={{ color: "#E89B4C" }}>Pack size {props.uom}</label>
        <label style={{ color: "#E89B4C" }}>SKU {props.sku}</label>
      </Space>

      <Space
        direction="horizontal"
        style={{ width: "100%", justifyContent: "center" }}
      >
        <input
          type="number"
          style={{ height: 30, width: 90 }}
          placeholder="qty"
          onChange={(val) => {
            setQuantity(val);
          }}
        />
      </Space>
      <Meta description={props.stock + " available"} />
    </Card>
  );
};
export default ProductCard;
