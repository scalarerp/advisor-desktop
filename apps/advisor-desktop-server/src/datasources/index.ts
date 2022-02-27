import { AccountService } from './AccountService';
import { ClientService } from './ClientService';
import { OrderService } from './OrderService';
import { SecurityService } from './SecurityService';

// Set up the dataSources needed by our resolvers
export const dataSources = () => ({
  accountService: new AccountService(),
  clientService: new ClientService(),
  orderService: new OrderService(),
  securityService: new SecurityService(),
});
