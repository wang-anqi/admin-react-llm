import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';


// const option = {
//   xAxis: {
//     type: 'category',
//     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
//   },
//   yAxis: {
//     type: 'value'
//   },
//   series: [
//     {
//       data: [120, 200, 150, 80, 70, 110, 130],
//       type: 'bar'
//     }
//   ]
// };

const EchartsComp = ({option}) => {
    const  chartRef = useRef()
  useEffect(() => { // 修正 useEffect 的语法
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);
    option && myChart.setOption(option);

    // 清理函数，防止内存泄漏
    return () => {
      myChart.dispose();
    };
  }, [option]);

  return (
    <>
      <div id='main' ref={ chartRef} style={{ width: '100%', height: '400px' }}></div>
    </>
  );
}

export default EchartsComp;
