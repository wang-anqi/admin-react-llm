import { Row, Col, Card } from "antd";
import "../assets/styles/homePage.scss";
import { RocketTwoTone } from "@ant-design/icons";
interface inforBoxItem {
  image: any;
  des: string;
  num?: string; // 可选的路由路径
}

interface inforBoxItems {
  item: inforBoxItem[];
}

const InfoBoxComp: React.FC<inforBoxItems> = ({ items }) => {
  return (
    <>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {items.map((item) => {
          return (
            <Col className="gutter-row" span={6} key={item.des}>
              <Card hoverable>
                <div className="header-box" >
                  <div className="left" style={{ fontSize: '45px'}}>{item.icon}</div>
                  <div className="right">
                    <div className="des">{item.des}</div>
                    <div className="num"><span>￥</span>{item.num}</div>
                  </div>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default InfoBoxComp;
