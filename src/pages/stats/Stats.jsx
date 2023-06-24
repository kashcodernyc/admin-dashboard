import './Stats.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import React, { useCallback, useState, useContext, useMemo } from "react";
import { UserContext } from '../../Contexts/UserContext';
import { PieChart, Pie, Sector, Cell } from "recharts";

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
    name,
    value
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

  const statusFillColorMap = {
    'Open': 'orange',
    'In Progress': '#1d65ff',
    'Resolved': 'rgb(0, 171, 46)',
    'Closed': 'red',
  };

  const statusFillColor = statusFillColorMap[payload.name];

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
        fill={statusFillColor}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={statusFillColor}
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
      >{`${value} ${name}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`${(percent * 100).toFixed(2)}%`}
      </text>
    </g>
  );
};



const Stats = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { ticketData } = useContext(UserContext)

  const getStatusCount = useCallback(
    (status) => {
      return ticketData.filter((ticket) => ticket.status === status).length;
    },
    [ticketData]
  );

  const statusFillColorMap = {
    'Open': 'orange',
    'In Progress': '#1d65ff',
    'Resolved': 'rgb(0, 171, 46)',
    'Closed': 'red',
  };

  const data = useMemo(() => {
    const uniqueStatuses = Array.from(new Set(ticketData.map((ticket) => ticket.status)));

    return uniqueStatuses.map((status) => {
      return {
        name: status,
        value: getStatusCount(status),
        color: statusFillColorMap[status] || 'gray',
      };
    });
  }, [ticketData, getStatusCount]);

  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );


  return (
    <div className='container'>
      <Sidebar />
      <div className='invoiceContainer'>
        <Navbar />
        <div className='widgets'>
          <div className="pieChartContainer">
            <div className='title'>Ticket Status Report</div>
            <h3 style={{ color: '#00143e' }} className='h3title'>Current Tickets: {ticketData.length}</h3>
            <PieChart width={360} height={300}>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data}
                cx={180}
                cy={120}
                innerRadius={50}
                outerRadius={70}
                dataKey="value"
                onMouseEnter={onPieEnter}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
            <div className='statusLabelContainer'>
              <div className='statusLabel'>
                <div className='statusLabelSquare statusLabelOpen'></div>
                <p>Open</p>
              </div>
              <div className='statusLabel'>
                <div className='statusLabelSquare statusLabelProgress'></div>
                <p>In Progress</p>
              </div>
              <div className='statusLabel'>
                <div className='statusLabelSquare statusLabelResolved'></div>
                <p>Resolved</p>
              </div>
              <div className='statusLabel'>
                <div className='statusLabelSquare statusLabelClosed'></div>
                <p>Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stats