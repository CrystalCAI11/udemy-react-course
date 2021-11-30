import "./Chart.css"
import { ChartBar } from "./ChartBar"

export const Chart = (props) => {
  const dataPointValues = props.dataPoints.map((dataPoint) => dataPoint.value) // 把对象数组变成number数组
  const totalMaximum = Math.max(...dataPointValues) // 加上...是把[]里的items提取出来做Math.max()的参数
  return (
    <div className="chart">
      {props.dataPoints.map((dataPoint) => (
        <ChartBar
          value={dataPoint.value}
          maxValue={totalMaximum}
          label={dataPoint.label}
          key={dataPoint.id}
        />
      ))}
    </div>
  )
}
