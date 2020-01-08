/**
 * 
 * UrlPieChart Component that produces the PieChart (Url Analytics) using Pie Component.
 * Passes props to the Pie Component
 */
import React from "react";
import Pie from "../Pie/Pie.component";
class UrlPieChart extends React.Component {
  state = {};
  render() {
    var colors = ["#43A19E", "#7B43A1", "#F2317A", "#FF9824", "#58CF6C"];
    var data = [1, 2, 3, 4];
    console.log("Inside pie", this.props.data, this.props.colors);
    const sum = this.props.data.reduce(function(carry, current) {
      return carry + current;
    }, 0);
    return (
      <div>
        {sum > 0 ? (
          <div>
            <Pie
              data={this.props.data}
              radius={150}
              hole={50}
              colors={this.props.colors}
              labels={true}
              percent={true}
              strokeWidth={3}
              stroke={"#fff"}
            />
          </div>
        ) : (
          <div>No Data Available</div>
        )}
      </div>
    );
  }
}

export default UrlPieChart;
