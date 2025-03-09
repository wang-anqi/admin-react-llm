import { Button, Form, Input, Popconfirm, Table, Modal, DatePicker, Select, InputNumber } from "antd";
import React, { useEffect, useRef, useState } from "react";
import "../../assets/styles/userPage.scss";
import { log } from "console";
import { getUser , addUser, editUser, deleteUser } from "../../api/axiosData/user";
import { useForm } from "antd/es/form/Form";
import dayjs from 'dayjs'

const userPage = () => {
  const [form] = Form.useForm();
  const [formModal] = useForm()
  const [userData, setUserData] = useState({
    name: "",
  });
  const [tableData, setTableData] = useState([]);
  const handleSubmit = (type,rowData) => {
    console.log(type);
    if(type === 'add'){
        setOpen(true);
        setModalType(0);
    }
    if(type === 'edit'){
        setOpen(true);
        setModalType(1);
        console.log(rowData);
        const cloneData = JSON.parse(JSON.stringify(rowData))
         cloneData.birth = dayjs(rowData.birth)
         console.log(cloneData);
        
         
         formModal.setFieldsValue( cloneData)
        
        
    }
  };
  // 搜素框搜索
  const onFinish = (values: any) => {
    console.log(values);
    setUserData({
      name: values.searchKeys,
    });
  };
  const userDataDelete = (rowData) => {
    console.log('delete',rowData);
    deleteUser(rowData).then(()=>{
      console.log('删除');
      fetchUserData()
      
    })
    
  };
  const columns = [
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "性别",
      dataIndex: "gender",
      key: "gender",
      render: (val) => {
        return val ? "女" : "男";
      },
    },
    {
      title: "住址",
      dataIndex: "addr",
      key: "addr",
    },
    {
      title: "出生日期",
      dataIndex: "birth",
      key: "birth",
    },
    {
      title: "操作",
      render: (rowData) => {
        return (
          <div className="action-box">
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => handleSubmit("edit",rowData)}
            >
              编辑
            </Button>
            <Popconfirm
              title="温馨提示"
              description="将要删除该用户信息, 是否继续?"
              okText="确认"
              cancelText="取消"
              onConfirm={() => userDataDelete(rowData)}
            >
              <Button type="primary" danger>
                删除
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

 

  const fetchUserData = async (params) => {
    const response = await getUser(params);
    setTableData(response.data.list);
    console.log(response.data.list);
  };
 
  const [open, setOpen] = useState(false);
  const [modalType,setModalType] = useState(0)
 

  const handleOk = () => {
   formModal.validateFields().then((val)=>{
    console.log(val);
    val.birth = dayjs(val.birth).format('YYYY-MM-DD')
    console.log(val);

    if(modalType){
        // 编辑
       console.log('Bianji', val);
       
        
        editUser(val).then(() => {
            // 关闭弹窗
            
            fetchUserData()
            handleCancel()
          })
    }else{
        console.log('新增数据');
        addUser(val).then(()=>{
            handleCancel()
            fetchUserData()
        })
        
    }
   
   })
  };

  const handleCancel = () => {
    setOpen(false);
    formModal.resetFields()
  };


  useEffect(() => {
    fetchUserData(userData);
    console.log(userData);
  }, [userData]);
  useEffect(() => {
    fetchUserData(userData);
  }, []);

  return (
    <div className="user-box">
      <div className="header">
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => handleSubmit("add")}
        >
          新增
        </Button>
        <Form
          layout="inline"
          form={form}
          name="search-form"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
        >
          <Form.Item name="searchKeys" rules={[{ required: true }]}>
            <Input placeholder="请输入搜索的关键词" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="table-container">
        <Table dataSource={tableData} columns={columns} />;
      </div>

      <Modal
        open={open}
        title={modalType ? '编辑用户' : '新增用户'}
        onOk={handleOk}
        onCancel={handleCancel}
         okText="确定"
        cancelText="取消"
      >
         <Form
          form={formModal}
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          labelAlign="left"
        >
          { modalType == 1 &&
            <Form.Item
              name="id"
              hidden
            >
              <Input/>
            </Form.Item>
          }
          <Form.Item
            label="姓名"
            name="name"
            rules={[
              {
                required: true,
                message: '请输入姓名',
              },
            ]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item
            label="年龄"
            name="age"
            rules={[
              {
                type: 'number',
                message: '年龄必须是数字',
              },
              {
                required: true,
                message: '请输入年龄',
              },
            ]}
          >
            <InputNumber placeholder="请输入年龄" />
          </Form.Item>
          <Form.Item
            label="性别"
            name="gender"
            rules={[
              {
                required: true,
                message: '性别是必选项',
              },
            ]}
          >
            <Select
              placeholder="请选择性别"
              options={[
                { value: 0, label: '男' },
                { value: 1, label: '女' }
              ]}
            ></Select>
          </Form.Item>
          <Form.Item
            label="出生日期"
            name="birth"
            rules={[
              {
                required: true,
                message: '请选择出生日期',
              },
            ]}
          >
            <DatePicker placeholder="请选择" format="YYYY/MM/DD" />
          </Form.Item>
          <Form.Item
            label="地址"
            name="addr"
            rules={[
              {
                required: true,
                message: '请填写地址',
              },
            ]}
          >
            <Input placeholder="请填写地址" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default userPage;
