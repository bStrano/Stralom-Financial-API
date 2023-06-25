import { MigrationInterface, QueryRunner } from 'typeorm';
import { TableNamesEnum } from '../../../shared/constants/enums/TableNamesEnum';

export class CreateTransactionCategories1671634229173 implements MigrationInterface {
  name = 'CreateTransactionCategories1671634229173';
  private readonly TABLE_NAME = TableNamesEnum.TRANSACTION_CATEGORY;

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE ${this.TABLE_NAME}
       (
           id    uuid default uuid_generate_v4() not null
               constraint "PK_bbd38b9174546b0ed4fe04689c7"
                   primary key,
           name  varchar                         not null,
           color varchar                         not null,
           icon  varchar                         not null
       )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE ${this.TABLE_NAME}`);
  }
}
