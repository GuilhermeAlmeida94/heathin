export interface PaginatedData<T> {
    content: T[];
    number: number;
    size: number;
    totalElements: number;
}
