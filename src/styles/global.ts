import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --background: #f0f2f5;
    --red: #E52E4D;
    --blue: #5429CC;
    --green: #33CC95;

    --blue-light: #6933FF;

    --text-title: #363f5f;
    --text-body: #969cb3;

    --shape: #FFFFFF
}

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%; // 15px
    }

    @media (max-width: 720px) {
      font-size: 87.5%; // 14px
    }
  }

  body {
    background: var(--background);
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 600;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .react-modal-overlay {
    background: rgba(0, 0, 0, 0.5);

    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .react-modal-content {
    width: 100%;
    max-width: 576px;
    background: var(--background);
    padding: 4rem 3rem;
    position: relative;
    border-radius: 0.3rem;
  }

  .react-modal-close {
    position: absolute;
    top: 1.3rem;
    right: 1.3rem;
    border: 0;
    background: transparent;
    font-size: 0;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.8);
    }
  }

  @media (max-width: 576px) {
    .react-modal-overlay {
      align-items: flex-end;
    }

    .react-modal-content {
      max-width: 768px;
      background: var(--background);
      padding: 1.5rem;
      position: relative;
      border-radius: 1rem 1rem 0 0;

      display: flex;
      justify-content: center;
    }

    .react-modal-close {
      position: absolute;
      top: 2.06rem;
      right: 1.5rem;
    }
  }
`;