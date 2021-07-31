import { createContext, useContext, useEffect, useState } from 'react';

import { api } from '../services/api';

interface Transaction {
  id: number;
  title: string;
  type: 'deposit' | 'withdraw';
  amount: number;
  category: string;
  createdAt: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

interface TransactionsProviderProps {
  children: React.ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction(transaction: TransactionInput): Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get('/transactions')
      .then(response => setTransactions(response.data.transactions));
  }, []);

  async function createTransaction(transaction: TransactionInput) {
    const response = await api.post('/transactions', {
      ...transaction,
      createdAt: new Date()
    });

    setTransactions(prevState => ([...prevState, response.data.transaction]))
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}

function useTransactions() {
  return useContext(TransactionsContext);
}

export { useTransactions, TransactionsProvider };

