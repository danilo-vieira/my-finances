import {
  Container
} from './styles';

interface Transaction {
  id: string;
  title: string;
  type: 'deposit' | 'withdraw';
  amount: string;
  category: string;
  createdAt: string;
}

interface ListItemProps {
  transaction: Transaction
}

export function ListItem({ transaction }: ListItemProps) {
  return (
    <Container onClick={() => console.log('asd')}>
      <div className="header">
        <p>{transaction.title}</p>
        <strong
          className={transaction.type}
        >
          {transaction.amount}
        </strong>
      </div>

      <div className="footer">
        <p>{transaction.category}</p>
        <p>{transaction.createdAt}</p>
      </div>
    </Container>
  );
}