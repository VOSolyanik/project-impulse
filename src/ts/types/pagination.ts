type PaginationParams = {
  page?: number;
  limit?: number;
};

type PaginatedResponse<T> = {
  page: number;
  perPage: number;
  totalPages: number;
  results: T[];
};

export { PaginationParams, PaginatedResponse };
