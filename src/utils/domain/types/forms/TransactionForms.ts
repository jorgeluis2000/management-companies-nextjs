export type TTransactionAdd = {
  amount: ValueItem<string>;
  concept: ValueItem<string>;
  type: ValueItem<string>;
};

type ValueItem<T> = {
  value: T;
};
