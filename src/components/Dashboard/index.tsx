import { Summary } from '../Summary';
import { TransactionsList } from '../TransactionsList';

import {
  Container,
} from './styles';

export function Dashboard() {
  return (
    <Container>
      <Summary />
      <TransactionsList />
    </Container>
  );
}