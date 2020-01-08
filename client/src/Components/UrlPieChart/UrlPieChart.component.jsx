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

// var App = React.createClass({
//   getInitialState: function() {
//     return {
//       data: [5, 12, 8, 3, 10]
//     };
//   },
//   componentDidMount: function() {
//     setInterval(
//       function() {
//         var dataSize = getRandomInt(2, 6),
//           data = [];

//         for (; dataSize--; ) {
//           data.push(getRandomInt(1, 20));
//         }

//         this.setState({ data: data });
//       }.bind(this),
//       2000
//     );
//   },
//   render: function() {

//   }
// });
