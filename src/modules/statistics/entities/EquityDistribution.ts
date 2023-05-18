import { Expose } from 'class-transformer';
import { EquityDistributionInterface } from '@core/modules/statistics/equity/EquityDistributionInterface';

export class EquityDistribution implements EquityDistributionInterface {
  totalBalance: number;
  totalInvested: number;
  constructor(props: { totalBalance: number; totalInvested: number }) {
    this.totalBalance = props.totalBalance;
    this.totalInvested = props.totalInvested;
  }

  @Expose()
  get total() {
    return this.totalInvested + this.totalBalance;
  }

  @Expose()
  get balancePercentage() {
    return (this.totalBalance * 100) / this.total;
  }

  @Expose()
  get investedPercentage() {
    return (this.totalInvested * 100) / this.total;
  }
}
