import styled from 'styled-components'

export const Container = styled.header`
  background: var(--blue);
`;

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;

  padding: 2rem 1rem 8.25rem;
  
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    font-size: 1rem;
    color: #FFFFFF;
    background: var(--blue-light);
    border: 0;
    padding: 0 2rem;
    border-radius: 0.3rem;
    height: 3rem;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }

  @media (max-width: 768px) {
    padding: 2rem 1.56rem 8.25rem;

    img {
      width: 8.4rem;
      height: 1.95rem;
    }

    button {
      height: 2.5rem;
      padding: 0.687rem;
      font-size: 0.75rem;
    }
  }
`;