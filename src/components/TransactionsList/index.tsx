import { useMemo } from 'react';
import { Trash } from 'react-feather';

import { useTransactions } from '../../hooks/useTransactions';
import { convertCurrencyToBRL } from '../../utils/convertCurrencyToBRL';
import { ListItem } from '../ListItem';

import {
  Container
} from './styles';

export function TransactionsList() {
  const { transactions, deleteTransaction } = useTransactions();

  function handleDeleteTransaction(id: string) {
    const userDecision = window.confirm('Você tem certeza que deseja apagar esse registro?');

    if (userDecision) {
      deleteTransaction(id);
    }
  }

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
      <table className="desktop">
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
                  onClick={() => handleDeleteTransaction(transaction.id)}
                >
                  <Trash color="#E52E4D" size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mobile">
        <header>
          <span>Listagem</span>
          <span>
            {
              parsedTransactions.length === 1
                ? '1 item'
                : `${parsedTransactions.length} itens`
            }
          </span>
        </header>

        <ul>
          {parsedTransactions.map(transaction => (
            <ListItem
              key={transaction.id}
              transaction={transaction}
            />
          ))}
        </ul>
      </div>
    </Container>
  );
}