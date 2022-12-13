import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload,
  Card,
} from "antd";
import { server } from "../../constants";
import { httpClient } from "../../utils/HttpClient";
import swal from "sweetalert";
import { getProductDetail } from "../../actions/product.action";
import { Content } from "antd/es/layout/layout";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

let customerByAPI = [];
let productList = [];
const CreateOrderForm = (props) => {
  const [componentDisabled, setComponentDisabled] = useState(false);
  const onFormLayoutChange = ({ disabled }) => {
    setComponentDisabled(disabled);
  };
  const [dataCollected, setDataCollected] = useState(0);
  const [dataProduct, setDataProduct] = useState(0);
  const [customer, setCustomer] = useState("");
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [tax, setTax] = useState(0);
  const [paymentType, setPaymentType] = useState(0);
  const [paymentDue, setpaymentdue] = useState(0);

  useEffect(() => {
    if (localStorage.getItem(server.TOKEN_KEY) === null) {
      return props.history.push("/login");
    }

    getCustomer();
    getProduct();
  }, []);
  const getCustomer = async () => {
    await httpClient
      .get(process.env.REACT_APP_API_URL + "customer")
      .then((response) => {
        setDataCollected(response.data.data);
        for (var i = 0; i < response.data.data.length; i++) {
          customerByAPI.push({
            label: response.data.data[i].name,
            value: response.data.data[i],
          });
        }
        console.log(customerByAPI);
      })
      .catch((error) => {
        swal("Error!", "Unexpected error", "error");
      });
  };

  const getProduct = async () => {
    await httpClient
      .get(process.env.REACT_APP_API_URL + "product")
      .then((response) => {
        setDataProduct(response.data.data);
        for (var i = 0; i < response.data.data.length; i++) {
          productList.push({
            label: response.data.data[i].name,
            value: response.data.data[i]._id,
          });
        }
        console.log(productList);
      })
      .catch((error) => {
        swal("Error!", "Unexpected error", "error");
      });
  };
  const handleSubmit = async () => {
    console.log("cusomer", customer);
    let dataToSend = {
      idCustomer: customer._id,
      name: customer.name,
      address: customer.address,
      noPhone: customer.noPhone,
      email: customer.email,
      payment_due: paymentDue,
      payment_type: paymentType,
      orderList: [{ sellingPrice: price, productId: product, qty: quantity }],
      tax: tax,
      total: price * quantity,
      subtotal: price * quantity,
    };
    await httpClient
      .post(process.env.REACT_APP_API_URL + "order", dataToSend)
      .then((response) => {
        console.log(response.data.data);
        swal("Created Successfully");
      })
      .catch((error) => {
        swal("Error!", "Unexpected error", "error");
      });
  };
  return (
    <>   <div className="content-wrapper">
         <Content>
    <Card title = "Create order" bordered = {true}>

   
        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          onValuesChange={onFormLayoutChange}
          disabled={componentDisabled}
        >
       

          <Form.Item label="Customer">
            <Select
              onChange={(val) => {
                console.log("vall", val);
                let value = dataCollected.find((item) => item._id === val);
                setCustomer(value);
              }}
            >
              {dataCollected &&
                dataCollected.map((data02, i) => {
                  return (
                    <Select.Option value={data02._id}>
                      {data02.name}
                    </Select.Option>
                  );
                })}
            </Select>
          </Form.Item>
          <Form.Item label="Product">
            <Select
              onChange={(val) => {
                console.log("vall", val);

                setProduct(val);
              }}
            >
              {dataProduct &&
                dataProduct.map((data02, i) => {
                  return (
                    <Select.Option value={data02._id}>
                      {data02.name}
                    </Select.Option>
                  );
                })}
              <Select.Option value={"Test"}>{"Test"}</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Price">
            <Input
              onChange={(val) => {
                setPrice(val);
              }}
            />
          </Form.Item>
          <Form.Item label="Quantity">
            <Input
              onChange={(val) => {
                setQuantity(val);
              }}
            />
          </Form.Item>
          <Form.Item label="Payment Type">
            <Select
              onChange={(val) => {
                setPaymentType(val);
              }}
            >
              <Select.Option value="demo">Credit</Select.Option>
              <Select.Option value="demo">Cash</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Tax(%)">
            <Input
              onChange={(val) => {
                setTax(val);
              }}
            />
          </Form.Item>
          <Form.Item label="Payment Due">
            <Select
              onChange={(val) => {
                setpaymentdue(val);
              }}
            >
              <Select.Option value="30">1 Month</Select.Option>
              <Select.Option value="60">2 Month</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="  ">
            <Button
            className="btn-primary"
              onClick={() => {
                handleSubmit();
              }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
     
      </Card>

      </Content>

      </div>
    </>
  );
};
export default () => <CreateOrderForm />;
