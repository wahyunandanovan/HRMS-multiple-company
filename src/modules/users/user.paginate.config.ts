import { FilterOperator, PaginateConfig } from 'nestjs-paginate';

export const UserPaginateConfig: PaginateConfig<any> = {
  sortableColumns: ['username', 'role', 'created_at', 'company'],
  defaultSortBy: [['created_at', 'DESC']],
  searchableColumns: ['username', 'role'],
  filterableColumns: {
    company: [FilterOperator.EQ],
    role: [FilterOperator.EQ],
  },
};
