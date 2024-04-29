import { FilterOperator, PaginateConfig } from 'nestjs-paginate';

export const companyPaginateConfig: PaginateConfig<any> = {
  sortableColumns: ['company_name', 'created_at'],
  defaultSortBy: [['created_at', 'DESC']],
  searchableColumns: ['code'],
  relations: ['user'],
  filterableColumns: {
    code: [FilterOperator.EQ],
  },
};
