import { FormEvent, useState } from 'react';
import Modal from 'react-modal';

import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';

import { useTransactions } from '../../hooks/useTransactions';

import {
  Container,
  TransactionTypeContainer,
  RadioBox
} from './styles';

interface NewTransactionModalProps {
  onRequestClose: () => void;
  isOpen: boolean;
}

Modal.setAppElement('#root');

export function NewTransactionModal({
  isOpen,
  onRequestClose
}: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();

  const [type, setType] = useState<"deposit" | "withdraw">('deposit');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  async function handleCreateNewTransaction(e: FormEvent) {
    e.preventDefault();

    createTransaction({
      title,
      amount: Number(amount),
      category,
      type
    });

    setType('deposit');
    setTitle('');
    setAmount('');
    setCategory('');

    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input
          placeholder="Título"
          value={title}
          onChange={(e) => { setTitle(e.target.value) }}
        />
        <input
          type="number"
          step="any"
          placeholder="Valor"
          value={String(amount)}
          onChange={(e) => { setAmount(e.target.value) }}
        />
        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => { setType('deposit') }}
            isActive={type === 'deposit'}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            onClick={() => { setType('withdraw') }}
            isActive={type === 'withdraw'}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>
        <input
          placeholder="Categoria"
          value={category}
          onChange={(e) => { setCategory(e.target.value) }}
        />

        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}