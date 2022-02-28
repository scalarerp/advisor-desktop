import Highcharts from 'highcharts';

const ChartColors = [
  '#00BFF8',
  '#008733',
  '#FFB618',
  '#FF4A44',
  '#64E572',
  '#FF9655',
  '#FFF263',
  '#6AF9C4',
];

export function setChartOptions() {
  Highcharts.setOptions({
    colors: ChartColors,
  });
}
