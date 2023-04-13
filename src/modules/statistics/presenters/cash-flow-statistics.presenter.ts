import { CashFlowCompiledGroupedByCategoryInterface } from '@core/modules/statistics/CashFlowCompiledGroupedByCategory';
import { Injectable } from '@nestjs/common';
import { CashFlowSummaryInterface } from '@core/modules/statistics/CashFlowSummaryInterface';
import { CashFlowCompiledInterface } from '@core/modules/statistics/CashFlowCompiledInterface';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class CashFlowStatisticsPresenter {
  formatExpensesTotalCompiledByCategoryWithAbsoluteValuesOnly(cashFlowCompiledGroupedByCategoryInterface: CashFlowCompiledGroupedByCategoryInterface[]) {
    return cashFlowCompiledGroupedByCategoryInterface.map((item) => {
      return {
        ...item,
        total: Math.abs(item.total),
      };
    });
  }

  formatCashFlowSummaryWithAbsoluteValuesOnly(data: CashFlowSummaryInterface): CashFlowSummaryInterface {
    const plainObject = instanceToPlain(data);
    const outComing = plainObject.outComing;

    outComing.total = Math.abs(outComing.total);
    outComing.current = Math.abs(outComing.current);
    outComing.values = outComing.values.map((item: CashFlowCompiledInterface) => {
      return {
        ...item,
        total: Math.abs(item.total),
        accumulated: Math.abs(item.accumulated),
      };
    });
    return {
      ...data,
      outComing,
    };
  }
}
