import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";
import Data from "../../data.json";
import Title from "./Title";

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

let receivedClaims = 0;
let rejectedClaims = 0;
let awaitingClaims = 0;

Data.claims.map (item => {
  if (item.status === "received"){
    receivedClaims += 1
  }
  else if(item.status === "awaiting_action"){
    awaitingClaims += 1
  }
  else {
    rejectedClaims += 1
  }
})

const data = [
  { name: "Received", value: receivedClaims },
  { name: "Awaited", value: awaitingClaims },
  { name: "Rejected", value: rejectedClaims},
];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`PV ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default function PieChartDashboard() {
  const classes = useStyles();

  const [activeIndex, setactiveIndex] = useState(0);

  const onPieEnter = (data, index) => {
    setactiveIndex(index);
  };
  return (
    <React.Fragment>
      <Title>Claim Status</Title>
      <ResponsiveContainer>
      <PieChart width={400} height={400}>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx={170}
          cy={120}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          onMouseEnter={onPieEnter}
        />
      </PieChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
