import {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';
import { v4 } from 'uuid';

interface Transaction {
  id: string;
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
  createTransaction(transaction: TransactionInput): void;
  deleteTransaction(id: string): void;
}

const LOCAL_STORAGE_KEY = "@my-finances:transactions";

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const storagedTransactions = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (storagedTransactions) {
      setTransactions(JSON.parse(storagedTransactions))
    }
  }, []);

  function createTransaction(transaction: TransactionInput) {
    const newTransaction = {
      id: v4(),
      ...transaction,
      createdAt: String(new Date())
    };

    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify([...transactions, newTransaction])
    );

    setTransactions(prevState => ([...prevState, newTransaction]))
  }

  function deleteTransaction(id: string) {
    const updatedTransactions = transactions.filter(transaction =>
      transaction.id !== id
    );

    localStorage.setItem(
      LOCAL_STORAGE_KEY,
      JSON.stringify(updatedTransactions)
    )

    setTransactions(updatedTransactions);
  }

  return (
    <TransactionsContext.Provider
      value={{ transactions, createTransaction, deleteTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}

function useTransactions() {
  return useContext(TransactionsContext);
}

export { useTransactions, TransactionsProvider };

