import * as React from 'react';
import { AssetAllocation } from 'advisor-models';
import { DrilldownOptions, SeriesPieOptions } from 'highcharts';
import { PieChart } from './PieChart';

export function computePieSeries(sectorAllocations: Array<AssetAllocation>) {
  return [
    {
      name: 'Sectors',
      data: sectorAllocations
        .map((sectorAllocation) => ({
          name: sectorAllocation.categoryName,
          y: Math.round(sectorAllocation.percentage * 100),
          drilldown: sectorAllocation.categoryId,
        }))
        .sort((a, b) => b.y - a.y), // descending order
    },
  ] as SeriesPieOptions[];
}

export function computePieDrilldown(sectorAllocations: Array<AssetAllocation>) {
  return {
    activeDataLabelStyle: {
      color: '#000000',
      fontWeight: 'normal',
      textDecoration: 'none',
    },
    series: sectorAllocations.map((sectorAllocation) => {
      const {
        categoryId,
        categoryName,
        children: industryAllocations,
      } = sectorAllocation;

      if (!industryAllocations) {
        return { id: categoryId, name: categoryName, data: [] };
      }

      const data = industryAllocations
        .map((industryAllocation) => {
          return [
            industryAllocation.categoryName,
            Math.round(industryAllocation.percentage * 100),
          ];
        })
        .sort((a: any, b: any) => b[1] - a[1]); // descending order

      return { id: categoryId, name: categoryName, data };
    }),
  } as DrilldownOptions;
}

export interface AssetAllocationChartProps {
  sectorAllocations: Array<AssetAllocation>;
}

export function AssetAllocationChart({
  sectorAllocations,
}: AssetAllocationChartProps) {
  const series = computePieSeries(sectorAllocations);
  const drilldown = computePieDrilldown(sectorAllocations);

  return (
    <PieChart title="ASSET ALLOCATION" series={series} drilldown={drilldown} />
  );
}
