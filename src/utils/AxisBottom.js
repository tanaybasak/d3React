
export const AxisBottom = ({xScale, innerHeight, tickFormat}) => {
 return xScale.ticks().map((tickValue) => (
    <g className="tick" key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
      <line y2={innerHeight} stroke="#C0C0BB" />
      <text dy={".71em"} y={innerHeight + 3} style={{ textAnchor: "middle" }}>
        {tickFormat(tickValue)}
      </text>
    </g>
  ));
};
