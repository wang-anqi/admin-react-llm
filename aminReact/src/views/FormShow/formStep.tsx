import CustomBreadcrumb from "../../components/MyBreadcrumb";
import "../../assets/styles/showShared.scss";
import {
  Alert,
  Button,
  Col,
  Divider,
  Form,
  Input,
  message,
  Radio,
  Result,
  Row,
  Steps,
  Table,
  TableColumnsType,
  theme,
} from "antd";
import { useEffect, useState } from "react";
type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};
const steps = [
  {
    title: "请填写信息",
    content: "submit your information",
  },
  {
    title: "请核实信息",
    content: "confirm your inform ",
  },
  {
    title: "填写完成",
    content: "successly!",
  },
];

const FormStepShow = () => {
  const breadcrumbItems = [
    { key: "dataShow", label: "表单" },
    { key: "table", label: "步骤表单" },
  ];
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    if (current === 0) {
      form.submit();
    }
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  // 样式部分  后续完善
  const contentStyle: React.CSSProperties = {
    height: " 260px",
    display: "flex",
    justifyContent: "center",
    alignItems: " center",

    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
  const alertBox: React.CSSProperties = {
    height: " 60px",
    marginBottom: "20px",
    padding: "6px 12px",
  };
  const [formData, setFormData] = useState({
    username: "",
    telephone: "",
  });

  const onFinish = (values) => {
    console.log("Success:");

    console.log(values);
    setFormData({
      username: values.username,
      telephone: values.telephone,
    });
    console.log(formData);
  };

  const [form] = Form.useForm();
  const submitAgain = () => {
    setCurrent(0);
    form.resetFields();
    setFormData({});
  };

  return (
    <div className="show-box">
      {/* <div className="breadcrumb-box">
        <CustomBreadcrumb items={breadcrumbItems}></CustomBreadcrumb>
      </div> */}
      <div className="content-box">
        <div className="content-item">
        <div className="title">
        <h1 className="hd">步骤表单提交</h1>
        </div>
          <Divider />
          <Steps current={current} items={items} />
          <div style={contentStyle}>
            {current === 0 && (
              <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item<FieldType>
                  label="用户名"
                  name="username"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item<FieldType>
                  label="联系方式"
                  name="telephone"
                  rules={[
                    { required: true, message: "请输入你的联系方式!" },
                    {
                      pattern: /^1[3-9]\d{9}$/,
                      message: "请输入有效的11位手机号!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Form>
            )}
            {current === 1 && (
              <div className="formTwo">
                <Alert
                  message="请核实您的信息"
                  type="warning"
                  showIcon
                  style={alertBox}
                />
                <Form className="show-data">
                  <Form.Item label="用户名">{formData.username}</Form.Item>
                  <Form.Item label="联系方式">{formData.telephone}</Form.Item>
                </Form>
              </div>
            )}
            {current === 2 && (
              <Result
                status="success"
                title="信息填写成功"
                extra={[
                  <Button
                    type="primary"
                    key="console"
                    onClick={() => submitAgain()}
                  >
                    再填一次
                  </Button>,
                ]}
              />
            )}
          </div>
          <div style={{ marginTop: 24 }}>
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                下一步
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                onClick={() => message.success("Processing complete!")}
              >
                完成
              </Button>
            )}
            {current > 0 && (
              <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                上一步
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormStepShow;
