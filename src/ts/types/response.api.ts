type PaginatedResponse<T> = {
  page: number;
  perPage: number;
  totalPages: number;
  results: T[];
};

export default PaginatedResponse;
