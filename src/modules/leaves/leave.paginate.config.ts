import { PaginateConfig } from 'nestjs-paginate';

export const LeavePaginateConfig: PaginateConfig<any> = {
  sortableColumns: ['created_at'],
  defaultSortBy: [['created_at', 'DESC']],
  relations: ['employee'],
};
