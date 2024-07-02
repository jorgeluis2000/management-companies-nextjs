

export type TTransactionAdd = {
    amount: ValueItem<string>
    concept: ValueItem<string>
    type: ValueItem<string>

}


export type ValueItem<T> = {
    value: T
}