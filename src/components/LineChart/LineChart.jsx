import { useEffect, useState } from 'react';
import Chart from 'react-google-charts';
import PropTypes from 'prop-types';

const LineChart = ({ historicalData }) => {
  const [data, setData] = useState([["Date", "Prices"]]);

  useEffect(() => {
    const dataCopy = [["Date", "Prices"]];
    if (historicalData.prices) {
      historicalData.prices.forEach((item) => {
        const date = new Date(item[0]); // Use a valid Date object
        const price = parseFloat(item[1]); // Ensure it's a number
        if (!isNaN(price)) {
          dataCopy.push([date, price]);
        }
      });
      setData(dataCopy);
    }
  }, [historicalData]);

  return (
    <Chart
      chartType="LineChart"
      data={data}
      options={{
        title: "Price Trend",
        hAxis: { title: "Date", format: "M/d/yy" },
        vAxis: { title: "Prices" },
      }}
      height="400px"
      legendToggle
    />
  );
};

// Define PropTypes for the component
LineChart.propTypes = {
  historicalData: PropTypes.shape({
    prices: PropTypes.arrayOf(
      PropTypes.arrayOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      )
    ),
  }).isRequired,
};

export default LineChart;
