import { PaginateConfig } from 'nestjs-paginate';

export const SalariesPaginateConfig: PaginateConfig<any> = {
  sortableColumns: ['created_at'],
  defaultSortBy: [['created_at', 'DESC']],
  relations: ['employee'],
};
