import { scaleBand, scaleLinear, max, format } from "d3";
import React from "react";
import { useData } from "../hooks/useData";
import { AxisBottom } from "../utils/AxisBottom";
import { AxisLeft } from "../utils/AxisLeft";
import { Marks } from "../utils/Marks";
// import PropTypes from 'prop-types';
// sunlight foundation data viz guidelines
const width = 960;
const height = 500;
const margin = { top: 20, right: 30, bottom: 65, left: 220 };

const xAxisLabelOffset = 50;

const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right;

function BarChart() {
  const data = useData();

  if (!data) {
    return <pre>Loading .... </pre>;
  }

  const xValue = (d) => d.Population;
  const yValue = (d) => d.Country;
  const siFormat = format('.2s');
  const xAxisTickFormat = tickValue => siFormat(tickValue).replace('G', 'B')

  const yScale = scaleBand()
    .domain(data.map(yValue))
    .rangeRound([0, innerHeight])
    .paddingInner(0.15);

  const xScale = scaleLinear()
    .domain([0, max(data, xValue)])
    .range([0, innerWidth]);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom xScale={xScale} innerHeight={innerHeight} tickFormat={xAxisTickFormat}/>
        <AxisLeft yScale={yScale} />
        <text className="axis-label" x={innerWidth / 2} y={innerHeight + xAxisLabelOffset} textAnchor={'middle'}>Population</text>
        <Marks
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
          tooltipFormat={xAxisTickFormat}
        />
      </g>
    </svg>
  );
}

export default BarChart;
