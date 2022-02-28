import { DataSource } from 'apollo-datasource';
import accounts from './data/accounts.json';
import cashBalances from './data/cash-balances.json';
import holdings from './data/holdings.json';
import { RawAccount } from './models';

export class AccountService extends DataSource {
  constructor() {
    super();
  }

  initialize() {}

  getAccounts(clientId: string) {
    return accounts.filter((account) => account.ownerId === clientId);
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

  getClientCashBalance(clientId: string): number | undefined {
    const accounts = this.getAccounts(clientId);
    return accounts.reduce((accumulator: number, account: RawAccount) => {
      const cashBalance = cashBalances.find(
        (cashBalance) => cashBalance.id === account.id
      );
      return cashBalance ? accumulator + cashBalance.balance : accumulator;
    }, 0);
  }

  getAccountHoldings(accountId: string) {
    return holdings.filter((holding) => holding.accountId === accountId);
  }

  getAccountHolding(accountId: string, symbol: string) {
    return holdings.find(
      (holding) => holding.accountId === accountId && holding.symbol === symbol
    );
  }

  getClientHoldings(clientId: string) {
    return holdings.filter((holding) => {
      const account = this.getAccount(holding.accountId);
      return account ? account.ownerId === clientId : false;
    });
  }
}
