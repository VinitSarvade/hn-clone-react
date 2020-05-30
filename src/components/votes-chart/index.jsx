import React from "react";
import { ResponsiveLine } from "@nivo/line";

import styles from "./votes-chart.module.scss";

const NewsVotesChart = ({ news }) => {
  const chartData = [
    {
      id: "Votes",
      data: news.map((newsitem) => ({
        x: newsitem.objectID,
        y: newsitem.points,
      })),
    },
  ];

  return (
    <div className={styles.chartContainer}>
      <ResponsiveLine
        data={chartData}
        margin={{ top: 50, right: 60, bottom: 80, left: 60 }}
        xScale={{ type: "point" }}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 45,
          legend: "ID",
          legendOffset: 60,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Votes",
          legendOffset: -50,
          legendPosition: "middle",
        }}
        colors={{ scheme: "nivo" }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={4}
        pointBorderColor={{ from: "serieColor" }}
        pointLabel="votes"
        pointLabelYOffset={-12}
        useMesh={true}
      />
    </div>
  );
};

export default NewsVotesChart;
