import { useState } from "react";
import CustomBreadcrumb from "../../components/MyBreadcrumb";
import { Divider, Button, message, Steps, theme } from "antd";

const description = "这是步骤的描述信息";
const stepsList = [
  {
    title: "First",
    content: "First-content",
  },
  {
    title: "Second",
    content: "Second-content",
  },
  {
    title: "Last",
    content: "Last-content",
  },
];

const StepNavPage = () => {
  const breadcrumbItems = [
    { key: "dataShow", label: "导航" },
    { key: "table", label: "步骤条" },
  ];
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = stepsList.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle: React.CSSProperties = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };
  const [currentLast, setCurrentLast] = useState(0);

  const onChangeLast = (value: number) => {
    console.log("onChange:", value);
    setCurrentLast(value);
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
          <Steps
            current={1}
            items={[
              {
                title: "Finished",
                description,
              },
              {
                title: "In Progress",
                description,
                subTitle: "Left 00:00:08",
              },
              {
                title: "Waiting",
                description,
              },
            ]}
          />
        </div>

        <div className="content-item">
        <div className="title">
        <h1 className="hd">步骤切换</h1>
        </div>
          <Divider />
          <Steps current={current} items={items} />
          <div style={contentStyle}>{stepsList[current].content}</div>
          <div style={{ marginTop: 24 }}>
            {current < stepsList.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Next
              </Button>
            )}
            {current === stepsList.length - 1 && (
              <Button
                type="primary"
                onClick={() => message.success("Processing complete!")}
              >
                Done
              </Button>
            )}
            {current > 0 && (
              <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                Previous
              </Button>
            )}
          </div>
        </div>
        <div className="content-item">
        <div className="title">
        <h1 className="hd">步骤运行错误</h1>
        </div>
          <Divider />
          <Steps
            current={1}
            status="error"
            items={[
              {
                title: "Finished",
                description,
              },
              {
                title: "In Process",
                description,
              },
              {
                title: "Waiting",
                description,
              },
            ]}
          />
        </div>
        <div className="content-item">
        <div className="title">
        <h1 className="hd">点击改变步骤状态</h1>
        </div>
          <Divider />
          <Steps
            current={currentLast}
            onChange={onChangeLast}
            items={[
              {
                title: "Step 1",
                description,
              },
              {
                title: "Step 2",
                description,
              },
              {
                title: "Step 3",
                description,
              },
            ]}
          />
          <Divider />

          <Steps
            current={currentLast}
            onChange={onChangeLast}
            direction="vertical"
            items={[
              {
                title: "Step 1",
                description,
              },
              {
                title: "Step 2",
                description,
              },
              {
                title: "Step 3",
                description,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default StepNavPage;
