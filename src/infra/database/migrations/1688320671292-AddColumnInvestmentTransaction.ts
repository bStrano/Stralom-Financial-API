import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';
import { TableNamesEnum } from '../../../shared/constants/enums/TableNamesEnum';

export class AddColumnInvestmentTransaction1688320671292 implements MigrationInterface {
  private readonly REDEEMPTION_INVESTMENT_COLUMN = 'redeemedInvestmentId';
  private readonly INVESTMENT_COLUMN = 'investmentId';
  private readonly INVESTMENT_REFERENCE_FOREIGN_KEY = 'fk_investment_reference';
  private readonly REDEEMPTION_REFERENCE_FOREIGN_KEY = 'fk_redeemed_reference';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      TableNamesEnum.TRANSACTION,
      new TableColumn({
        name: this.INVESTMENT_COLUMN,
        type: 'uuid',
        comment: 'The id of the investment linked with this transaction',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      TableNamesEnum.TRANSACTION,
      new TableColumn({
        name: this.REDEEMPTION_INVESTMENT_COLUMN,
        type: 'uuid',
        comment: 'The id of the investment redeemption linked with this transaction',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      TableNamesEnum.TRANSACTION,
      new TableForeignKey({
        name: this.INVESTMENT_REFERENCE_FOREIGN_KEY,
        columnNames: [this.INVESTMENT_COLUMN],
        referencedColumnNames: ['id'],
        referencedTableName: TableNamesEnum.INVESTMENT,
      }),
    );

    await queryRunner.createForeignKey(
      TableNamesEnum.TRANSACTION,
      new TableForeignKey({
        name: this.REDEEMPTION_REFERENCE_FOREIGN_KEY,
        columnNames: [this.REDEEMPTION_INVESTMENT_COLUMN],
        referencedColumnNames: ['id'],
        referencedTableName: TableNamesEnum.INVESTMENT,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(TableNamesEnum.TRANSACTION, this.INVESTMENT_COLUMN);
  }
}
