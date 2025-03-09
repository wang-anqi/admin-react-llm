import CustomBreadcrumb from "../../components/MyBreadcrumb";
import "../../assets/styles/showShared.scss";
import { useState } from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Divider, Form, Input, Select, Space } from "antd";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const FormBasicShow = () => {
  const breadcrumbItems = [
    { key: "dataShow", label: "表单" },
    { key: "table", label: "基础表单" },
  ];
  const [form] = Form.useForm();

  const onGenderChange = (value: string) => {
    switch (value) {
      case "male":
        form.setFieldsValue({ note: "Hi, man!" });
        break;
      case "female":
        form.setFieldsValue({ note: "Hi, lady!" });
        break;
      case "other":
        form.setFieldsValue({ note: "Hi there!" });
        break;
      default:
    }
  };

  const onFinish = (values: any) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFill = () => {
    form.setFieldsValue({ note: "Hello world!", gender: "male" });
  };

  return (
    <div className="show-box">
      {/* <div className="breadcrumb-box">
        <CustomBreadcrumb items={breadcrumbItems}></CustomBreadcrumb>
      </div> */}
      <div className="content-box">
        <div className="content-item">
          <div className="title">
            <h1 className="hd">基本使用</h1>
          </div>
          <Divider />
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="content-item">
          <div className="title">
            <h1 className="hd">表单方法调用</h1>
          </div>
          <Divider />
          <Form
            {...layout}
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
          >
            <Form.Item name="note" label="Note" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="Select a option and change input text above"
                onChange={onGenderChange}
                allowClear
              >
                <Option value="male">male</Option>
                <Option value="female">female</Option>
                <Option value="other">other</Option>
              </Select>
            </Form.Item>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.gender !== currentValues.gender
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("gender") === "other" ? (
                  <Form.Item
                    name="customizeGender"
                    label="Customize Gender"
                    rules={[{ required: true }]}
                  >
                    <Input />
                  </Form.Item>
                ) : null
              }
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Space>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button htmlType="button" onClick={onReset}>
                  Reset
                </Button>
                <Button type="link" htmlType="button" onClick={onFill}>
                  Fill form
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
        <div className="content-item">
          <div className="title">
            <h1 className="hd">表单混合布局</h1>
          </div>
          <Divider />
          <Form
            name="layout-multiple-horizontal"
            layout="horizontal"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
          >
            <Form.Item
              label="horizontal"
              name="horizontal"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              layout="vertical"
              label="vertical"
              name="vertical"
              rules={[{ required: true }]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input />
            </Form.Item>
          </Form>
          <br />
          <Form
            name="layout-multiple-vertical"
            layout="vertical"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
          >
            <Form.Item
              label="vertical"
              name="vertical"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              layout="horizontal"
              label="horizontal"
              name="horizontal"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default FormBasicShow;
