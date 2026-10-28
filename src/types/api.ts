
export interface ApiError {
    error: {
        code: string,
        message: string,
        details?: unknown
    }
}

export interface Paginated<T>{
    items: T[],
    page:number,
    pageSize:number, 
    total:number, 
    totalPages:number
}