import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';
import { TableNamesEnum } from '../../../shared/constants/enums/TableNamesEnum';

export class AddColumnsInstalmentTransaction1684977174676 implements MigrationInterface {
  private readonly INSTALMENT_CURRENT_COLUMN = 'instalmentCurrent';
  private readonly INSTALMENT_MAX_COLUMN = 'instalments';
  private readonly INSTALMENT_REFERENCE_COLUMN = 'referenceTransactionId';
  private readonly INSTALMENT_REFERENCE_FOREIGN_KEY = 'fk_instalment_reference';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      TableNamesEnum.TRANSACTION,
      new TableColumn({
        name: this.INSTALMENT_CURRENT_COLUMN,
        type: 'int',
        comment: 'The current instalment of the transaction',
        default: 1,
      }),
    );

    await queryRunner.addColumn(
      TableNamesEnum.TRANSACTION,
      new TableColumn({
        name: this.INSTALMENT_MAX_COLUMN,
        type: 'int',
        comment: 'The numbers of instalments that the transaction have',
        default: 1,
      }),
    );

    await queryRunner.addColumn(
      TableNamesEnum.TRANSACTION,
      new TableColumn({
        name: this.INSTALMENT_REFERENCE_COLUMN,
        type: 'uuid',
        isNullable: true,
        comment: 'The id of the transaction that originated this. For instalments is the transaction of the first instalment',
      }),
    );

    await queryRunner.createForeignKey(
      TableNamesEnum.TRANSACTION,
      new TableForeignKey({
        name: this.INSTALMENT_REFERENCE_FOREIGN_KEY,
        columnNames: [this.INSTALMENT_REFERENCE_COLUMN],
        referencedColumnNames: ['id'],
        referencedTableName: TableNamesEnum.TRANSACTION,
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(TableNamesEnum.TRANSACTION, this.INSTALMENT_CURRENT_COLUMN);
    await queryRunner.dropColumn(TableNamesEnum.TRANSACTION, this.INSTALMENT_REFERENCE_COLUMN);
    await queryRunner.dropColumn(TableNamesEnum.TRANSACTION, this.INSTALMENT_MAX_COLUMN);
  }
}
