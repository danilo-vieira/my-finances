import { useMemo } from 'react';

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import totalImg from '../../assets/total.svg';

import { useTransactions } from '../../hooks/useTransactions';
import { convertCurrencyToBRL } from '../../utils/convertCurrencyToBRL';

import {
  Container
} from './styles';

export function Summary() {
  const { transactions } = useTransactions();

  const formattedSummary = useMemo(() => {
    const result = transactions.reduce((acc, curr) => {
      if (curr.type === 'deposit') {
        acc.income += curr.amount;
        acc.total += curr.amount;
      } else {
        acc.outcome += curr.amount;
        acc.total -= curr.amount;
      }

      return acc;
    }, {
      income: 0,
      outcome: 0,
      total: 0
    });

    return {
      income: convertCurrencyToBRL(result.income),
      outcome: convertCurrencyToBRL(result.outcome),
      total: convertCurrencyToBRL(result.total),
    }
  }, [transactions]);

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>

        <strong>{formattedSummary.income}</strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>

        <strong>{formattedSummary.outcome}</strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>

        <strong>{formattedSummary.total}</strong>
      </div>
    </Container>
  );
}