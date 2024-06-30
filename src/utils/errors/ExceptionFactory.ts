const createErrorFactory = (name: string) => {
    return class BusinessError extends Error {
        constructor(message: string) {
            super(message)
            this.name = name
        }
    }
}


export const ConnectionError = createErrorFactory('ConnectionError')
export const NotFoundObjectError = createErrorFactory('NotFoundObjectError')
export const QueryError = createErrorFactory('QueryError')