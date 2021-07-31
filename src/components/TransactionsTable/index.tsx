import { useMemo } from 'react';

import { useTransactions } from '../../hooks/useTransactions';

import {
  Container
} from './styles';

export function TransactionsTable() {
  const { transactions } = useTransactions();

  const parsedTransactions = useMemo(() => {
    return transactions.map(transaction => ({
      ...transaction,
      amount: transaction.type === 'withdraw'
        ? `${'- ' + new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(transaction.amount)}`
        : new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(transaction.amount),
      createdAt: new Intl.DateTimeFormat('pt-BR').format(new Date(transaction.createdAt))
    }))
  }, [transactions]);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {parsedTransactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>{transaction.amount}</td>
              <td>{transaction.category}</td>
              <td>{transaction.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}