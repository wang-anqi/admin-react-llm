import { Col, Divider, Row } from "antd";
import InfoBoxComp from "../../components/infoBox";
import {
  RocketTwoTone,
  PropertySafetyTwoTone,
  CreditCardTwoTone,
  GiftTwoTone,
  FullscreenOutlined,
} from "@ant-design/icons";
import screenfull from "screenfull";
import EchartComp from "../../components/echartCom";
import "./layoutIndex.scss";
import { getPaddingFromTooltipModel } from "echarts/types/src/component/tooltip/tooltipMarkup.js";
import { useEffect, useRef } from "react";
const inforList = [
  {
    icon: <RocketTwoTone />,
    des: "描述学习",
    num: "1763,900",
  },
  {
    icon: <PropertySafetyTwoTone />,
    des: "描述2",
    num: "1763,900",
  },
  {
    icon: <CreditCardTwoTone />,
    des: "描述3学习",
    num: "1763,900",
  },
  {
    icon: <GiftTwoTone />,
    des: "描述4学习",
    num: "1763,900",
  },
];

const option = {
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: "bar",
    },
  ],
};
const optionLine = {
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: "line",
    },
  ],
};
const optionBar = {
  tooltip: {
    trigger: "item",
  },
  legend: {
    top: "5%",
    left: "center",
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: "Search Engine" },
        { value: 735, name: "Direct" },
        { value: 580, name: "Email" },
        { value: 484, name: "Union Ads" },
        { value: 300, name: "Video Ads" },
      ],
    },
  ],
};
const option4 = {
  tooltip: {
    trigger: "item",
  },
  legend: {
    top: "5%",
    left: "center",
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: ["50%", "70%"],
      avoidLabelOverlap: false,
      padAngle: 5,
      itemStyle: {
        borderRadius: 10,
      },
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: "Search Engine" },
        { value: 735, name: "Direct" },
        { value: 580, name: "Email" },
        { value: 484, name: "Union Ads" },
        { value: 300, name: "Video Ads" },
      ],
    },
  ],
};
const colors = ["#5470C6", "#EE6666"];
const option5 = {
  color: colors,
  tooltip: {
    trigger: "none",
    axisPointer: {
      type: "cross",
    },
  },
  legend: {},
  grid: {
    top: 70,
    bottom: 50,
  },
  xAxis: [
    {
      type: "category",
      axisTick: {
        alignWithLabel: true,
      },
      axisLine: {
        onZero: false,
        lineStyle: {
          color: colors[1],
        },
      },
      axisPointer: {
        label: {
          formatter: function (params) {
            return (
              "Precipitation  " +
              params.value +
              (params.seriesData.length ? "：" + params.seriesData[0].data : "")
            );
          },
        },
      },
      // prettier-ignore
      data: ['2016-1', '2016-2', '2016-3', '2016-4', '2016-5', '2016-6', '2016-7', '2016-8', '2016-9', '2016-10', '2016-11', '2016-12'],
    },
    {
      type: "category",
      axisTick: {
        alignWithLabel: true,
      },
      axisLine: {
        onZero: false,
        lineStyle: {
          color: colors[0],
        },
      },
      axisPointer: {
        label: {
          formatter: function (params) {
            return (
              "Precipitation  " +
              params.value +
              (params.seriesData.length ? "：" + params.seriesData[0].data : "")
            );
          },
        },
      },
      // prettier-ignore
      data: ['2015-1', '2015-2', '2015-3', '2015-4', '2015-5', '2015-6', '2015-7', '2015-8', '2015-9', '2015-10', '2015-11', '2015-12'],
    },
  ],
  yAxis: [
    {
      type: "value",
    },
  ],
  series: [
    {
      name: "Precipitation(2015)",
      type: "line",
      xAxisIndex: 1,
      smooth: true,
      emphasis: {
        focus: "series",
      },
      data: [
        2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,
      ],
    },
    {
      name: "Precipitation(2016)",
      type: "line",
      smooth: true,
      emphasis: {
        focus: "series",
      },
      data: [
        3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7,
      ],
    },
  ],
};
const style: React.CSSProperties = { background: "#0092ff", padding: "8px 0" };

const HomePage = () => {
  const chartRef = useRef();
  const fullScreenHandle = () => {
    console.log(111);
    if (screenfull.isEnabled) {
      console.log(1121);

      screenfull.toggle(chartRef.current);
    }
  };
  useEffect(() => {
    if (screenfull.isEnabled) {
      screenfull.on("change", () => {
        if (screenfull.isFullscreen) {
          // 进入全屏时调整样式
          chartRef.current.style.width = "100vw";
          chartRef.current.style.height = "100vh";
          chartRef.current.style.backgroundColor = "white"; // 示例背景色
        } else {
          // 退出全屏时恢复样式
          chartRef.current.style.width = "";
          chartRef.current.style.height = "";
          chartRef.current.style.backgroundColor = ""; // 恢复默认背景色
        }
      });
    }

    // 组件卸载时清除监听器
    return () => {
      if (screenfull.isEnabled) {
        screenfull.off("change");
      }
    };
  }, []);
  return (
    <div className="home-box">
      <div className="header-container">
        <InfoBoxComp items={inforList}></InfoBoxComp>
      </div>

      <div className="content-home">
        <Row className="one-echart">
          <Col span={24}>
            <div className="base-style">
              <div className="bar-title">
                <div>图形全屏展示</div>
                <FullscreenOutlined
                  style={{ cursor: "pointer" }}
                  onClick={fullScreenHandle}
                />
              </div>
              <Divider style={{ padding: "0 8px" }} />
              <div className="echart-container" ref={chartRef}>
                <EchartComp option={option}></EchartComp>
              </div>
            </div>
          </Col>
        </Row>

        <Row gutter={[12, 24]}>
          <Col span={12}>
            <div className="echart-item">
              <EchartComp option={optionLine}></EchartComp>
            </div>
          </Col>
          <Col span={12}>
            <div className="echart-item">
              <EchartComp option={optionBar}></EchartComp>
            </div>
          </Col>
          <Col span={12}>
            <div className="echart-item">
              <EchartComp option={option4}></EchartComp>
            </div>
          </Col>
          <Col span={12}>
            <div className="echart-item">
              <EchartComp option={option5}></EchartComp>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HomePage;
