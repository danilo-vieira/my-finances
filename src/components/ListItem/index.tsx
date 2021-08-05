import { useEffect, useRef, useState, TouchEvent, HTMLAttributes, useCallback } from 'react';
import { Trash } from 'react-feather';

import { useTransactions } from '../../hooks/useTransactions';

import {
  Container
} from './styles';

interface Transaction {
  id: string;
  title: string;
  type: 'deposit' | 'withdraw';
  amount: string;
  category: string;
  createdAt: string;
}

interface ListItemProps {
  transaction: Transaction;
}

export function ListItem({ transaction }: ListItemProps) {
  const containerRef = useRef<HTMLLIElement>(null);
  const [touchStartX, setTouchStartX] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0)
  const [containerStyle, setContainerStyle] = useState<HTMLAttributes<HTMLDivElement>['style']>({ left: '0px' });
  const [touchMoveX, setTouchMoveX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [swipeActionTriggered, setSwipeActionTriggered] = useState(false);

  const { deleteTransaction } = useTransactions();

  function askDeleteTransaction() {
    return window.confirm('Deseja mesmo apagar esse registro?');
  }

  function handleStart(clientX: number) {
    setTouchStartX(clientX);
    setIsDragging(true);
  }

  function handleMove(clientX: number) {
    if (isDragging) {
      setTouchMoveX(clientX);
      let deltaX = clientX - touchStartX;
      const twoThirdsWidth = (containerWidth / 3) * 2;

      if (deltaX <= -(twoThirdsWidth)) {
        setIsDragging(false);
        setSwipeActionTriggered(true);
        const shouldDeleteTransaction = askDeleteTransaction();

        if (shouldDeleteTransaction) {
          deleteTransaction(transaction.id);
        } else {
          setTouchMoveX(0);
          setSwipeActionTriggered(false);
          setContainerStyle({ left: '0px', transition: 'ease-out 0.2s' });
          return;
        }
      } else if (deltaX > 0) {
        deltaX = 0;
      }
      setContainerStyle({ left: `${deltaX}px` });
    }
  }

  function handleEnd() {
    setIsDragging(false);
    const deltaX = touchMoveX - touchStartX;
    const halfTheMiddleWidth = (containerWidth / 2);
    const twoThirdsWidth = (containerWidth / 3) * 2;

    if (
      deltaX <= -(halfTheMiddleWidth)
      && !swipeActionTriggered
      && touchMoveX !== 0
    ) {
      setContainerStyle(() => ({ left: `${-twoThirdsWidth}px`, transition: 'ease-out 0.2s' }));
      let shouldDeleteTransaction: boolean;

      setTimeout(() => {
        shouldDeleteTransaction = askDeleteTransaction();

        if (shouldDeleteTransaction) {
          deleteTransaction(transaction.id);
        } else {
          setTouchMoveX(0);
          setContainerStyle({ left: '0px', transition: 'ease-out 0.4s' });
        }
      }, 300);
      return;
    }

    setContainerStyle({ left: '0px', transition: 'ease-out 0.2s' });
  }

  const handleTouchStart = useCallback((touchStartEvent: globalThis.TouchEvent) => {
    touchStartEvent.preventDefault();
    handleStart(touchStartEvent.targetTouches[0].clientX);
  }, [])

  function handleTouchMove(touchMoveEvent: TouchEvent<HTMLLIElement>) {
    handleMove(touchMoveEvent.targetTouches[0].clientX);
  }

  function handleTouchEnd() {
    handleEnd();
  }

  useEffect(() => {
    const containerRefValue = containerRef.current;

    if (containerRefValue?.offsetWidth) {
      setContainerWidth(containerRefValue.offsetWidth);
    }

    containerRefValue?.addEventListener(
      'touchstart',
      handleTouchStart,
    );

    return () => {
      containerRefValue?.removeEventListener(
        'touchstart',
        handleTouchStart,
      );
    }
  }, [handleTouchStart])

  return (
    <Container
      ref={containerRef}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Trash color="#FFF" size={18} />
      <div
        className="swipeable-content"
        style={containerStyle}
      >
        <div className="header">
          <p>{transaction.title}</p>
          <strong
            className={transaction.type}
          >
            {transaction.amount}
          </strong>
        </div>

        <div className="footer">
          <p>{transaction.category}</p>
          <p>{transaction.createdAt}</p>
        </div>
      </div>
    </Container>
  );
}