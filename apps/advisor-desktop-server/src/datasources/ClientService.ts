import { DataSource } from 'apollo-datasource';
import clients from './data/clients.json';

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
}
