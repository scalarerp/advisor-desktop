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
}
