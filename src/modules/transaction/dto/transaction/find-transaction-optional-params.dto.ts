import { PaginationDto } from '../../../../shared/dtos/pagination/pagination.dto';

export class FindTransactionOptionalParamsDto extends PaginationDto {
  userId?: number;
  ids?: string[];
  referenceTransactionId?: string[];
}
