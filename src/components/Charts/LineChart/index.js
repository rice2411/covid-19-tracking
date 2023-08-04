import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";
import { TextField } from "@material-ui/core";

const generateOptions = (data) => {
  return {
    chart: {
      height: 500,
    },
    title: {
      text: "Tổng ca nhiễm",
    },
    xAxis: {
      categories: ["Số ca nhiễm", "Số ca phục hồi", "Số ca tử vong"],
    },
    colors: ["#F3585B"],
    yAxis: {
      min: 0,
      title: {
        text: "Số lượng bệnh nhân",
      },
      labels: {
        align: "right",
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    series: [
      {
        data: [
          data[0]?.confirmed || 1,
          data[0]?.recovered || data[0]?.active || 2,
          data[0]?.deaths || 3,
        ],
      },
    ],
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
  };
};

export default function LineChart({ data, setDate }) {
  const [options, setOptions] = useState({});

  useEffect(() => {
    setOptions(generateOptions(data));
  }, [data]);

  return (
    <>
      <TextField
        id="date"
        label="Ngày"
        type="date"
        defaultValue={moment().format("YYYY-MM-DD")}
        onChange={(e) => {
          setDate(e.target.value);
        }}
        InputLabelProps={{
          shrink: true,
        }}
        style={{
          width: "100%",
          textAlign: "center",
        }}
      />
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
}
