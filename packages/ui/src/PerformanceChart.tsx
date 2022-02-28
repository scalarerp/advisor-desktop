import * as React from 'react';
import { Series } from 'advisor-models';
import { LineChart } from './LineChart';

interface PerformanceChartProps {
  performance: Array<Series>;
}

export function PerformanceChart({ performance }: PerformanceChartProps) {
  const series = computeLineChartSeries(performance);
  return <LineChart title="PERFORMANCE" series={series} />;
}

// transforms series to format required by LineChart
function computeLineChartSeries(performance: Array<Series>) {
  return performance.map((series) => ({
    name: series.name,
    data:
      series.data && series.data.map((dataPoint) => [dataPoint.x, dataPoint.y]),
  }));
}
