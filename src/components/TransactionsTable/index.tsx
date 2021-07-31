import { useMemo } from 'react';
import { Trash } from 'react-feather';

import { useTransactions } from '../../hooks/useTransactions';
import { convertCurrencyToBRL } from '../../utils/convertCurrencyToBRL';

import {
  Container
} from './styles';

export function TransactionsTable() {
  const { transactions, deleteTransaction } = useTransactions();

  const parsedTransactions = useMemo(() => {
    return transactions.map(transaction => ({
      ...transaction,
      amount: transaction.type === 'withdraw'
        ? `${'- ' + convertCurrencyToBRL(transaction.amount)}`
        : convertCurrencyToBRL(transaction.amount),
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
              <td>
                <button
                  type="button"
                  onClick={() => deleteTransaction(transaction.id)}
                >
                  <Trash color="#E52E4D" size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}