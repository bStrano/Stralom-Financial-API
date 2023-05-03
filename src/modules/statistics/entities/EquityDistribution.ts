import { Expose } from 'class-transformer';

export class EquityDistribution {
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
