import React from "react";
import CustomBreadcrumb from "../../components/MyBreadcrumb";
import { Collapse, Divider } from "antd";
import "../../assets/styles/showShared.scss";

const breadcrumbItems = [
  { key: "dataShow", label: "数据显示" },
  { key: "table", label: "表格" },
];
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'This is panel header 1',
    children: <p>{text}</p>,
  },
  {
    key: '2',
    label: 'This is panel header 2',
    children: <p>{text}</p>,
  },
  {
    key: '3',
    label: 'This is panel header 3',
    children: <p>{text}</p>,
  },
];

const itemsNest: CollapseProps['items'] = [
    {
      key: '1',
      label: 'This is panel nest panel',
      children: <p>{text}</p>,
    },
  ];
  
  const items2: CollapseProps['items'] = [
    {
      key: '1',
      label: 'This is panel header 1',
      children: <Collapse defaultActiveKey="1" items={itemsNest} />,
    },
    {
      key: '2',
      label: 'This is panel header 2',
      children: <p>{text}</p>,
    },
    {
      key: '3',
      label: 'This is panel header 3',
      children: <p>{text}</p>,
    },
  ];

const CollapseShow = () => {
    const onChange = (key: string | string[]) => {
        console.log(key);
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
          <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />
         
        </div>
        <div className="content-item">
        <div className="title">
        <h1 className="hd">手风琴</h1>
        </div>
          <Divider />
          <Collapse accordion items={items} />
         
        </div>
        <div className="content-item">
        <div className="title">
        <h1 className="hd">面板嵌套</h1>
        </div>
          <Divider />
          <Collapse onChange={onChange} items={items2} />
        </div>

        
      </div>

      {/* {
        // indicates very long content
        Array.from({ length: 100 }, (_, index) => (
          <React.Fragment key={index}>
            {index % 20 === 0 && index ? "more" : "..."}
            <br />
          </React.Fragment>
        ))
      } */}
    </div>
  );
};

export default CollapseShow;
