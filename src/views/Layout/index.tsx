import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  BarChartOutlined,
  FormOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import * as Icon from "@ant-design/icons";
import { Button, Layout, Menu, Popconfirm, Space, Tag, theme } from "antd";
import "../../assets/styles/layout.scss";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import narListConfig from "../../config/index";
import {  useDispatch, useSelector } from "react-redux";
import {addTag,removeTags,setCurrentFlag} from '../../stores/tags'
import { logOut } from "../../api/axiosData/permission";

const { Header, Sider, Content } = Layout;
const iconToElement = (name) => React.createElement(Icon[name]);
const narSideMenu = narListConfig.map((item) => {
  const child = {
    icon: iconToElement(item.icon),
    key: item.key,
    label: item.label,
  };
  if (item.children) {
    child.children = item.children.map((item) => {
      return {
        key: item.key,
        label: item.label,
      };
    });
  }
  return child;
});
// const narSideList = [
//   {
//     key: "/home",
//     icon: <HomeOutlined />,
//     label: "首页",
//   },
//   {
//     key: "/user",
//     icon: <UserOutlined />,
//     label: "用户数据",
//   },

//   {
//     key: "/show",
//     icon: <BarChartOutlined />,
//     label: "数据显示",
//     children: [
//       { key: "/show/table", label: "表格" },
//       { key: "/show/collapse", label: "折叠面板" },
//     ],
//   },
//   {
//     key: "form",
//     icon: <FormOutlined />,
//     label: "表单",
//     children: [
//       { key: "/form/basic", label: "基础表单" },
//       { key: "/form/step", label: "步骤表单" },
//     ],
//   },
//   {
//     key: "nav",
//     icon: <FormOutlined />,
//     label: "导航",
//     children: [{ key: "/nav/step", label: "步骤条" }],
//   },
// ];



const App: React.FC = () => {
  const locationNav = useLocation();
  const selectedKey = locationNav.pathname;
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const tagList = useSelector(state => state.tagList.tags)
  const setCurrent = useSelector(state => state.tagList.flagCurrent)
  const onMenuClick = (e) => {
   
    let data 
    narListConfig.forEach((item) => {
      // 找到当前的数据
      if (item.path === e.keyPath[e.keyPath.length - 1]) {
        data = item
        // 如果是有二级菜单
        if (e.keyPath.length > 1) {
          data = item.children.find((child) => {
            return child.path === e.key
          })
        }
      }
    })
    const newTagItem = {
      path:data.path,
      label:data.label
    }

    setTabsList(newTagItem )
    dispatch(setCurrentFlag(newTagItem.path))
   
    navigate(e.key);

  };

  const setTabsList = (val) => {
    dispatch(addTag(val))
  }

  const closeTag = (item, index) => {
    console.log('closeTag', item);
    // 关闭当前激活页
    if (setCurrent === item.path && tagList.length > 1) {
      if (setCurrent === tagList[tagList.length - 1].path) {
        // 如果是最后一个元素
        navigate(tagList[index - 1].path);
        dispatch(setCurrentFlag(tagList[index - 1].path));
      } else {
        // 如果不是最后一个元素
        navigate(tagList[index+1 ].path);
        dispatch(setCurrentFlag(tagList[index+1].path));
      }
    } else if (setCurrent === item.path && tagList.length === 1) {
      // 如果只有一个标签，关闭时清空当前激活状态
      dispatch(setCurrentFlag(''));
    }
  
    // 最后再删除标签
    dispatch(removeTags(item));
    
    console.log('关闭tag');
  };
  
  const goTo = (item)=>{
    navigate(item.path)
    dispatch(setCurrentFlag(item.path))
  }
  const onConfirm = async () => {
    console.log("退出");
  localStorage.removeItem('username')
  navigate('/login')
    
  
  };
 
  useEffect(()=>{
    console.log('tagList',tagList);
    
  },[tagList])
  // setCurrent 
  useEffect(()=>{
    console.log('setCurrent ',setCurrent );
    
  },[setCurrent ])
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 500);
    return () => clearTimeout(timer);
  }, [collapsed]);

  useEffect(() => {
    console.log("narSideMenu ", narSideMenu);
  }, []);

   
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo-title ">
          <h2 className={`title ${animate ? "fade" : ""}`}>
            {" "}
            {collapsed ? "后台" : "后台管理系统"}
          </h2>
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={narSideMenu}
          onClick={onMenuClick}
          selectedKeys={selectedKey}
        />
      </Sider>
      <Layout>
        <Header
          style={{ padding: 0, background: colorBgContainer }}
          className="header-box"
        >
          <div className="header-left">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </div>

          <div className="header-right">
            <span className="user-name">{localStorage.getItem('username') ? localStorage.getItem('username'):'用户名'}</span>
            <span className="user-logout">
              <Popconfirm
                title="是否确认退出？"
                okText="退出"
                cancelText="取消"
                onConfirm={onConfirm}
              >
                <LogoutOutlined /> 退出
              </Popconfirm>
            </span>
          </div>
        </Header>
        <Content>
      

      <div className="tag-box">
      <Space className="common-tag" size={[0, 8]} wrap>
            {
             tagList.map((item, index) => (
              
             <Tag key={item.path} closeIcon onClose={()=>closeTag(item,index)} style={{color:setCurrent===item.path ?"#2db7f5":''}} onClick={()=>goTo(item)}>
            {item.label}
           </Tag>
          
            ))}
        </Space>
      </div>
    
    
          <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
