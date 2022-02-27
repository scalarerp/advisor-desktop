import { DataSource } from 'apollo-datasource';
import accounts from './data/accounts.json';
import cashBalances from './data/cash-balances.json';
import holdings from './data/holdings.json';

export class AccountService extends DataSource {
  constructor() {
    super();
  }

  initialize() {}

  getAccounts(clientId: string) {
    return accounts.find((account) => account.ownerId === clientId);
  }

  getAccount(accountId: string) {
    return accounts.find((account) => account.id === accountId);
  }

  getAccountCashBalance(accountId: string): number | undefined {
    const cashBalance = cashBalances.find(
      (cashBalance) => cashBalance.id === accountId
    );
    return cashBalance ? cashBalance.balance : undefined;
  }

  getAccountHoldings(accountId: string) {
    return holdings.filter((holding) => holding.accountId === accountId);
  }

  getAccountHolding(accountId: string, symbol: string) {
    return holdings.find(
      (holding) => holding.accountId === accountId && holding.symbol === symbol
    );
  }
}
