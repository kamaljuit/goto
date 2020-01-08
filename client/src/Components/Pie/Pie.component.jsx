/**
 * Pie component to display the Url Pie Chart.
 * data:[] and colors:[] are required props. Also accepts other stylystic enhancement props
 *
 * BUG! ==> Cannot successfully render when only one index provides value
 * TODO ==> Remove this BUG
 */
import React from "react";
import Slice from "../Slice/Slice.component";
const Pie = props => {
  var colors = props.colors,
    colorsLength = colors.length,
    labels = props.labels,
    hole = props.hole,
    radius = props.radius,
    diameter = radius * 2,
    sum,
    startAngle,
    d = null;
  sum = props.data.reduce(function(carry, current) {
    return carry + current;
  }, 0);
  startAngle = 0;

  return (
    <svg
      width={diameter}
      height={diameter}
      viewBox={"0 0 " + diameter + " " + diameter}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
    >
      {props.data.map(function(slice, sliceIndex) {
        var angle, nextAngle, percent;

        nextAngle = startAngle;
        angle = (slice / sum) * 360;
        percent = (slice / sum) * 100;
        startAngle += angle;

        return (
          <Slice
            key={sliceIndex}
            value={slice}
            percent={props.percent}
            percentValue={percent.toFixed(1)}
            startAngle={nextAngle}
            angle={angle}
            radius={radius}
            hole={radius - hole}
            trueHole={hole}
            showLabel={labels}
            fill={colors[sliceIndex % colorsLength]}
            stroke={props.stroke}
            strokeWidth={props.strokeWidth}
          />
        );
      })}
    </svg>
  );
};

export default Pie;
