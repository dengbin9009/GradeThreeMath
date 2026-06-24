export interface BorrowReturnInput { borrowed: number; returned: number; remaining: number }
export interface BorrowReturnScene { shelf: number; borrowedBasket: number; returnedBasket: number }

export function buildBorrowReturnReplay(input: BorrowReturnInput): BorrowReturnScene[] {
  const borrowed = Math.max(0, Math.round(input.borrowed));
  const returned = Math.max(0, Math.round(input.returned));
  const remaining = Math.max(0, Math.round(input.remaining));
  const beforeReturn = Math.max(0, remaining - returned);
  const original = beforeReturn + borrowed;
  return [
    { shelf: remaining, borrowedBasket: 0, returnedBasket: 0 },
    { shelf: beforeReturn, borrowedBasket: 0, returnedBasket: returned },
    { shelf: original, borrowedBasket: borrowed, returnedBasket: returned },
    { shelf: remaining, borrowedBasket: borrowed, returnedBasket: returned }
  ];
}
