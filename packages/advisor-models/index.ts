export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Account = {
  __typename?: 'Account';
  accountNumber: Scalars['String'];
  assetAllocations: Array<AssetAllocation>;
  cashBalance: Scalars['Float'];
  holdings: Array<Holding>;
  id: Scalars['ID'];
  investmentTotal: Scalars['Float'];
  name: Scalars['String'];
  orders: Array<Order>;
  owner: Client;
  portfolio: Portfolio;
};

export type AssetAllocation = {
  __typename?: 'AssetAllocation';
  categoryId: Scalars['String'];
  categoryName: Scalars['String'];
  children?: Maybe<Array<AssetAllocation>>;
  percentage: Scalars['Float'];
  value: Scalars['Float'];
};

export type Client = {
  __typename?: 'Client';
  assetAllocations: Array<AssetAllocation>;
  cashBalance: Scalars['Float'];
  dob: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['ID'];
  investmentTotal: Scalars['Float'];
  name: Scalars['String'];
  performance: Array<Series>;
  phone: Scalars['String'];
  photo: Scalars['String'];
  retirementAge: Scalars['Int'];
};

export type DataPoint = {
  __typename?: 'DataPoint';
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type Holding = {
  __typename?: 'Holding';
  account: Account;
  id: Scalars['ID'];
  quantity: Scalars['Int'];
  security: Security;
  value: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** place a buy or sell order for a security */
  placeOrder: Order;
};

export type MutationPlaceOrderArgs = {
  orderInput: OrderInput;
};

export type Order = {
  __typename?: 'Order';
  account: Account;
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  limitPrice: Scalars['Float'];
  quantity: Scalars['Int'];
  security: Security;
  side: Side;
  status: OrderStatus;
  type: OrderType;
};

export type OrderInput = {
  accountId: Scalars['ID'];
  limitPrice: Scalars['Float'];
  quantity: Scalars['Int'];
  side: Side;
  symbol: Scalars['ID'];
  type: OrderType;
};

export enum OrderStatus {
  Canceled = 'CANCELED',
  Executed = 'EXECUTED',
  New = 'NEW',
  Placed = 'PLACED',
}

export enum OrderType {
  Limit = 'LIMIT',
  Market = 'MARKET',
}

export type Portfolio = {
  __typename?: 'Portfolio';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** returns the account with the specified accountId */
  account?: Maybe<Account>;
  /** returns the accounts owned by the speified client */
  accounts: Array<Account>;
  /** returns the specified client */
  client?: Maybe<Client>;
  /** returns all clients */
  clients: Array<Client>;
  /** returns the holdings for the specified account */
  holdings: Array<Holding>;
  /** returns the orders for the specified account */
  orders: Array<Order>;
  /** returns all securities whose id or name matches the query string */
  securities: Array<Security>;
};

export type QueryAccountArgs = {
  accountId: Scalars['ID'];
};

export type QueryAccountsArgs = {
  clientId: Scalars['ID'];
};

export type QueryClientArgs = {
  clientId: Scalars['ID'];
};

export type QueryHoldingsArgs = {
  accountId: Scalars['ID'];
};

export type QueryOrdersArgs = {
  accountId: Scalars['ID'];
};

export type QuerySecuritiesArgs = {
  query: Scalars['String'];
};

export type Security = {
  __typename?: 'Security';
  id: Scalars['ID'];
  name: Scalars['String'];
  price: Scalars['Float'];
};

export type Series = {
  __typename?: 'Series';
  data: Array<DataPoint>;
  name: Scalars['String'];
};

export enum Side {
  Buy = 'BUY',
  Sell = 'SELL',
}
