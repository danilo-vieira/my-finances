import styled from 'styled-components'

export const Container = styled.div`
  margin-top: 4rem;

  table {
    width: 100%;
    border-spacing: 0 0.5rem;

    th {
      color: var(--text-body);
      font-weight: 400;
      padding: 1.25rem 2rem;
      text-align: start;
    }
    td {
      background: var(--shape);
      color: var(--text-body);
      font-weight: 400;
      padding: 1.25rem 2rem;
      border-radius: 0.3rem;

      &:first-child {
        color: var(--text-title);
      }

      &.deposit {
        color: var(--green);
      }

      &.withdraw {
        color: var(--red);
      }

      button {
        font-size: 0;
        border: 0;
        background-color: transparent;
      }
    }
  }

  .mobile {
    display: none;
  }

  @media (max-width: 576px) {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    
    .desktop {
      display: none;
    }

    div.mobile {
      display: initial;
      width: 100%;
      max-width: 27rem;

      header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        span:first-child {
          font-size: 1.25rem;
          color: var(--text-title);
        }

        span:nth-child(2) {
          font-size: 0.875rem;
          color: var(--text-body);
        }
      }
    }

    ul {
      margin-top: 1rem;
      list-style: none;
      height: 30rem;
      padding-bottom: 3rem;
      overflow: scroll;
        &::-webkit-scrollbar {
        display: none;
      }
    }
  }
`;