import * as React from "react";
import { PieChart } from "react-minimal-pie-chart";

class PieChartComponent extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <PieChart
        data={[
          { title: "Correct", value: 10, color: "green" },
          { title: "Hinted", value: 15, color: "#f2b50c" },
        ]}
        viewBoxSize={[500, 500]}
        radius={15}
      />
    );
  }
}

export default PieChartComponent;
