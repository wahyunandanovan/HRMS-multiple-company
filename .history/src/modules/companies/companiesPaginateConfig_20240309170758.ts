import { FilterOperator, PaginateConfig } from 'nestjs-paginate';

export const companyPaginateConfig: PaginateConfig<any> = {
  sortableColumns: ['company_name', 'created_at'],
  defaultSortBy: [['created_at', 'DESC']],
  searchableColumns: ['code'],
  filterableColumns: {
    code: [FilterOperator.EQ],
  },
};
