import { AssetAllocation } from 'advisor-models';
import { DataSource } from 'apollo-datasource';
import industries from './data/industries.json';
import sectors from './data/sectors.json';
import securities from './data/securities.json';
import { RawHolding } from './models';

export class SecurityService extends DataSource {
  constructor() {
    super();
  }

  initialize() {}

  getSecurity(symbol: string) {
    return securities.find((security) => security.id === symbol);
  }

  getSecurities(query: string) {
    return securities.filter(
      (security) =>
        security.id.toLowerCase().includes(query.toLowerCase()) ||
        security.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  getSector(id: string) {
    return sectors.find((sector) => sector.id === id);
  }

  getIndustry(id: string) {
    return industries.find((industry) => industry.id === id);
  }

  getInvestmentTotal(holdings: Array<RawHolding>) {
    return holdings.reduce((accumulator: number, holding: RawHolding) => {
      const security = this.getSecurity(holding.symbol);
      return security
        ? accumulator + security.price * holding.quantity
        : accumulator;
    }, 0);
  }

  getAssetAllocations(holdings: Array<RawHolding>) {
    // iterate through holdings and start creating asset allocations
    const sectorAllocations: Array<AssetAllocation> = [];
    holdings.forEach((holding) => {
      const { symbol } = holding;
      const security = this.getSecurity(symbol);
      if (security) {
        const { industryId } = security;
        const industry = this.getIndustry(industryId);
        if (industry) {
          const { name: industryName, sectorId } = industry;
          const sector = this.getSector(sectorId);
          if (sector) {
            const { name: sectorName } = sector;

            // create a sector allocation if needed
            let sectorAllocation = sectorAllocations.find(
              (allocation) => allocation.categoryId === sectorId
            );
            if (sectorAllocation === undefined) {
              sectorAllocation = {
                categoryId: sectorId,
                categoryName: sectorName,
                value: 0,
                percentage: 0,
                children: [],
              };
              sectorAllocations.push(sectorAllocation);
            }
            const { children: industryAllocations } = sectorAllocation;

            // create a industryAllocation if needed
            let industryAllocation = industryAllocations!.find(
              (allocation) => allocation.categoryId === industryId
            );
            if (industryAllocation === undefined) {
              industryAllocation = {
                categoryId: industryId,
                categoryName: industryName,
                value: 0,
                percentage: 0,
              };
              industryAllocations!.push(industryAllocation);
            }

            // calculate value and add to sector and industry allocations
            const value = security.price * holding.quantity;
            sectorAllocation.value += value;
            industryAllocation.value += value;
          }
        }
      }
    });

    // calculate total account value as the sum of all sector values
    const accountValue = sectorAllocations.reduce(
      (accumulator: number, sectorAllocation: AssetAllocation) => {
        return accumulator + sectorAllocation.value;
      },
      0
    );

    // calculate sector allocation percentages
    sectorAllocations.forEach((sectorAllocation) => {
      sectorAllocation.percentage = sectorAllocation.value / accountValue;

      // calculate industry allocation percentages
      const { children: industryAllocations } = sectorAllocation;
      industryAllocations!.forEach((industryAllocation) => {
        industryAllocation.percentage =
          industryAllocation.value / sectorAllocation.value;
      });
    });

    return sectorAllocations;
  }
}
