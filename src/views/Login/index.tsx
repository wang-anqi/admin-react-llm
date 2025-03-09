import React from 'react';
import type { FormProps } from 'antd';
import { Button,Divider ,  Form, Input } from 'antd';
import '../../assets/styles/login.scss'
import { useNavigate } from 'react-router-dom';
import { login } from '../../api/axiosData/permission';

type FieldType = {
  username?: string;
  password?: string;
};


const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    
    navigate('/home')
    console.log(values);
    
    
   
    
    if(values.password && values.username){
      // 将用户名存储到localStorage
      localStorage.setItem('username', values.username);
    }
    
    
  };
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
  

    <div className="login-box">
      <div className="login-form">
        <h3>后台管理系统</h3>
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
      label="用户名"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>
  
    <Form.Item<FieldType>
      label="密码"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>
  
    
  
    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit"  >
        登录
      </Button>
    </Form.Item>
  
  </Form>
  </div>
    </div>
    
  )
};

export default LoginPage;