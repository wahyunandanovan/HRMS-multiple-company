import { PaginateConfig } from 'nestjs-paginate';

export const EmployeesPaginateConfig: PaginateConfig<any> = {
  sortableColumns: ['created_at'],
  defaultSortBy: [['created_at', 'DESC']],
};
