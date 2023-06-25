import { MigrationInterface, QueryRunner } from 'typeorm';
import { TableNamesEnum } from '../../../shared/constants/enums/TableNamesEnum';

export class CreateInvestmentType1684593245601 implements MigrationInterface {
  private readonly TABLE_NAME = TableNamesEnum.INVESTMENT_TYPE;
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `create table ${this.TABLE_NAME}
       (
           id   uuid default uuid_generate_v4() not null
               constraint "PK_5509533eeb8175ec89b8ca478b6"
                   primary key,
           name varchar                         not null
       );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE ${this.TABLE_NAME}`);
  }
}
