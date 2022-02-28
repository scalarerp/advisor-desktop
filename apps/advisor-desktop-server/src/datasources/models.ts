export interface RawAccount {
  id: string;
  name: string;
  accountNumber: string;
  ownerId: string;
  portfolioId: string;
}

export interface RawHolding {
  id: string;
  symbol: string;
  quantity: number;
  accountId: string;
}
