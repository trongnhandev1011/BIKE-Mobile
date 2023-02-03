export type PaginationResponse<T> = {
  code: number;
  message: string;
  data: {
    page: number;
    pageSize: number;
    totalSize: number;
    totalPage: number;
    items: T[];
  };
};

export type Response<T> = {
  code: number;
  message: string;
  data: T;
};
