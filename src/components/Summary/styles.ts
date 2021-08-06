import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-top: -4.25rem;

  div {
    background: var(--shape);
    padding: 1.5rem 2rem;
    border-radius: 0.3rem;
    color: var(--text-title);


    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    strong {
      display: block;
      margin-top: 0.8rem;
      font-size: 2.25rem;
      font-weight: 500;
      line-height: 3rem;
    }

    > p {
      display: none;
    }

    &.highlight-background {
      background: var(--green);
      color: var(--shape);
    }
  }

  @media (max-width: 576px) {
    margin-top: -6.25rem;
    gap: 1rem;

    div {
      height: 12.5rem;
      width: 18.75rem;
      padding: 1.125rem 1.4rem;

      font-size: 0.875rem;

      strong {
        margin-top: 2.18rem;
        font-size: 1.875rem;
      }

      > p {
        display: initial;
        font-size: 0.75rem;
        color: var(--text-body);
      }

      &.highlight-background {
        > p {
          color: var(--shape);
        }
      }
    }

    overflow-x: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;