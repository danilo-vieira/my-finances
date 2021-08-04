import { useMemo } from 'react';
import { format, isAfter, isBefore } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

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
    const formatHelper = (date: string | { earlyDate: Date, laterDate: Date }, type: string) => {
      if (typeof (date) === 'object' && (date.earlyDate && date.laterDate)) {
        return `
        ${format(date.earlyDate, "'De' dd 'de' MMMM 'à'", { locale: ptBR })} 
        ${format(date.laterDate, "dd 'de' MMMM", { locale: ptBR })}`
      } else if (typeof (date) === 'string') {
        return format(
          new Date(date),
          `'Última ${type === "income" ? "entrada" : "saída"} 'dd 'de' MMMM`,
          {
            locale: ptBR
          });
      }
    }

    const calcTotalTimeInterval = transactions.reduce((acc, transaction) => {
      if (!acc.earlyDate && !acc.laterDate) {
        acc.earlyDate = new Date(transaction.createdAt);
        acc.laterDate = new Date(transaction.createdAt);
      }
      else if (isBefore(new Date(transaction.createdAt), acc.earlyDate)) {
        acc.earlyDate = new Date(transaction.createdAt);
      } else if (isAfter(new Date(transaction.createdAt), acc.laterDate)) {
        acc.laterDate = new Date(transaction.createdAt);
      }

      return acc;
    }, {} as { earlyDate: Date, laterDate: Date })

    const result = transactions.reduce((acc, curr) => {
      if (curr.type === 'deposit') {
        acc.income.value += curr.amount;
        acc.total.value += curr.amount;
        acc.income.lastUpdate = formatHelper(
          curr.createdAt,
          'income'
        ) || ''
      } else {
        acc.outcome.value += curr.amount;
        acc.total.value -= curr.amount;
        acc.outcome.lastUpdate = formatHelper(
          curr.createdAt,
          'outcome'
        ) || ''
      }

      return acc;
    }, {
      income: {
        value: 0,
        lastUpdate: ''
      },
      outcome: {
        value: 0,
        lastUpdate: ''
      },
      total: {
        value: 0
      }
    });

    return {
      income: {
        value: convertCurrencyToBRL(result.income.value),
        lastUpdate: result.income.lastUpdate
      },
      outcome: {
        value: convertCurrencyToBRL(result.outcome.value),
        lastUpdate: result.outcome.lastUpdate
      },
      total: {
        value: convertCurrencyToBRL(result.total.value),
        resume: formatHelper(calcTotalTimeInterval, 'total'),
      }
    }
  }, [transactions]);

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>

        <strong>{formattedSummary.income.value}</strong>
        <p>{formattedSummary.income.lastUpdate || 'Sem registros ainda'}</p>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>

        <strong>{formattedSummary.outcome.value}</strong>
        <p>{formattedSummary.outcome.lastUpdate || 'Sem registros ainda'}</p>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>

        <strong>{formattedSummary.total.value}</strong>
        <p>{formattedSummary.total.resume || 'Sem registros ainda'}</p>
      </div>
    </Container>
  );
}