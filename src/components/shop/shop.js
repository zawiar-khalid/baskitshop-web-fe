import React, { useEffect, useState } from "react";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { FloatButton, Radio } from "antd";
import { CustomerServiceOutlined } from "@ant-design/icons";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Col, Row, Space } from "antd";

import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Link } from "react-router-dom";
import ProductCard from "./productCard";
import swal from "sweetalert";
import { httpClient } from "../../utils/HttpClient";
import { server } from "../../constants";
import CartDrawer from "./cartDrawer";
import Catbar from "./catbar";
const { Header, Content, Sider } = Layout;
const { Meta } = Card;



const PosShop = (props) => {
  const [shape, setShape] = useState("circle");
  const [cart, setCart] = useState(false);
  const onChange = (e) => {
    setShape(e.target.value);
  };

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
    await httpClient
      .get(process.env.REACT_APP_API_URL + "product")
      .then((response) => {
        setData(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        swal("Error!", "Unexpected error", "error");
      });
  };

  return (
    <div className="content-wrapper">
      <Layout>

      

        <Layout>
          <Layout
            style={{
              padding: "0 24px 24px",
            }}
          >
          {cart && <CartDrawer setCart={setCart} />}

            <Breadcrumb>
              <Breadcrumb.Item>Shop</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              style={{
                padding: 4,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
              }}
            >
              <Row>
                {data &&
                  data.map((data02, i) => {
                    console.log("daata02", data02);
                    return (
                      <ProductCard
                        id={data02._id}
                        name={data02.name}
                        stock={data02.stock}
                        sku={data02.sku}
                        price={data02.price}
                        image={data02.image}
                        uom={data02.uoms ? data02.uoms.label : "-"}
                      />
                    );
                  })}

                  
              </Row>
              

              <div
                
              >
                <FloatButton
                  style={{
                    marginBottom: 30,
                    marginRight: 30,
                    backgroundColor: "#E89B4C",
                    color: "#E89B4C",
                  }}
                  icon={<ShoppingCartIcon />}
                  type="primary"
                  shape={shape}
             

                 
                />


                <Link
                to={"/cart"}
                
              >
              
              </Link>


              </div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};
export default PosShop;
