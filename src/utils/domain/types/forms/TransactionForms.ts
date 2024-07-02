

export type TTransactionAdd = {
    amount: ValueItem<number>
    concept: ValueItem<string>
    type: ValueItem<string>

}


export type ValueItem<T> = {
    value: T
}