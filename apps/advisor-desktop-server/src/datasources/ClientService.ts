import { DataSource } from 'apollo-datasource';
import clients from './data/clients.json';
import performances from './data/performances.json';

export class ClientService extends DataSource {
  constructor() {
    super();
  }

  initialize() {}

  getClients() {
    return clients;
  }

  getClient(clientId: string) {
    return clients.find((client) => client.id === clientId);
  }

  getClientPerformance(clientId: string) {
    const accountPerformance = performances.find(
      (accountPerformance) => accountPerformance.id === clientId
    );
    return accountPerformance?.performance;
  }
}
