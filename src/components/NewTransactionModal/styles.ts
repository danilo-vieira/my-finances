import styled from 'styled-components';
import { darken, transparentize } from 'polished';

export const Container = styled.form`
  h2 {
    color: var(--text-title);
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }

  input {
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    border-radius: 0.3rem;

    border: 1px solid #d7d7d7;
    background: #e7e9ee;

    font-weight: 400;
    font-size: 1rem;

    &::placeholder {
      color: var(--text-body);
    }

    & + input {
      margin-top: 1rem;
    }
  }

  button[type="submit"] {
    width: 100%;
    height: 4rem;
    background: var(--green);
    margin-top: 1rem;
    border: 0;
    border-radius: 0.3rem;
    color: var(--shape);
    font-size: 1rem;
    font-weight: 600;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }

  @media (max-width: 576px) {
    max-width: 500px;

    h2 {
      font-size: 1.25rem;
      margin-bottom: 1.5rem;
    }

    input {
      & + input {
        margin-top: 0.5rem;
      }
    }

    button[type="submit"] {
      margin-top: 0.5rem;
    }
  }
`;

export const TransactionTypeContainer = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;

  @media (max-width: 576px) {
    margin: 0.5rem 0;
  }
`;

interface RadioBoxProps {
  isActive: boolean;
  activeColor: 'green' | 'red';
}

const colors = {
  green: '#12A454',
  red: '#E52E4D'
}

export const RadioBox = styled.button<RadioBoxProps>`
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d7d7d7;
  border-radius: 0.3rem;
  background: ${({ isActive, activeColor }) => isActive
    ? transparentize(0.9, colors[activeColor])
    : 'transparent'
  };

  transition: border-color 0.2s;

  &:hover {
    border-color: ${darken(0.1, '#d7d7d7')} 
  }

  img {
    margin-right: 1rem;
    width: 24px;
    height: 24px;
  }

  span {
    font-size: 1rem;
    font-weight: 400;
    color: var(--text-title);
  }
`;
