import styled from 'styled-components'

export const Container = styled.li`
  display: flex;
  flex-direction: column;
  background: var(--shape);
  padding: 1.05rem 1.5rem;
  border-radius: 0.3rem;
  width: 100%;
  
  /* button {
    border: 0;
    background: transparent;
    font-size: 0;
    display: flex;
    flex-direction: column;
    background: var(--shape);
    padding: 1.05rem 1.5rem;
    border-radius: 0.3rem;
    width: 100%;
  } */

  & + li {
    margin-top: 0.5rem;
  }

  div.header {
    p {
      color: var(--text-title);
      font-size: 0.875rem;
    }

    strong {
      display: block;
      margin-top: 0.125rem;
      font-size: 1.25rem;

      &.deposit {
        color: #12a454;
      }

      &.withdraw {
        color: var(--red);
      }
    }
  }

  div.footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 1.18rem;
    color: var(--text-body);
    font-size: 0.875rem;
  }
`;