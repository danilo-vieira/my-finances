import { createServer, Model } from 'miragejs';

export function makeServer({ environment = 'test' }) {
  createServer({
    environment,
    models: {
      transaction: Model
    },

    seeds(server) {
      server.db.loadData({
        transactions: [
          {
            id: 1,
            title: 'Desenvolvimento de site',
            amount: 12000,
            type: 'deposit',
            category: 'Venda',
            createdAt: new Date()
          },
          {
            id: 2,
            title: 'Hamburguer',
            amount: 59,
            type: 'withdraw',
            category: 'Alimentação',
            createdAt: new Date()
          },
          {
            id: 3,
            title: 'Aluguel do apartamento',
            amount: 1200,
            type: 'withdraw',
            category: 'Casa',
            createdAt: new Date()
          },
          {
            id: 4,
            title: 'Computador',
            amount: 5400,
            type: 'deposit',
            category: 'Venda',
            createdAt: new Date()
          }
        ]
      })
    },

    routes() {
      this.namespace = 'api';

      this.get('/transactions', () => {
        return this.schema.all('transaction');
      });

      this.post('/transactions', (schema, request) => {
        const data = JSON.parse(request.requestBody);

        return schema.create('transaction', data);
      })
    }
  })
}