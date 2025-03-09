import React from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom'; // 如果使用了react-router

// 定义每个面包屑项的类型
interface BreadcrumbItem {
  key: string;
  label: string;
  path?: string; // 可选的路由路径
}

// 定义Breadcrumb组件的Props类型
interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const CustomBreadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <Breadcrumb>
    <Breadcrumb.Item>
            <Link to='/home'>首页</Link>
        </Breadcrumb.Item>
      {items.length && items.map(item => (
        <Breadcrumb.Item key={item.key}>
          {item.path ? (
            <Link to={item.path}>{item.label}</Link> // 如果有路径，使用Link组件
          ) : (
            item.label // 如果没有路径，只显示文本
          )}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;
