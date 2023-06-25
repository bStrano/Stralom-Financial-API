import { MigrationInterface, QueryRunner } from 'typeorm';
import { TableNamesEnum } from '../../../shared/constants/enums/TableNamesEnum';

export class CreateInvestment1684593248976 implements MigrationInterface {
  private readonly TABLE_NAME = TableNamesEnum.INVESTMENT;

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `create table ${this.TABLE_NAME}(
               id               uuid      default uuid_generate_v4() not null
                   constraint "PK_ad085a94bd56e031136925f681b"
                       primary key,
               name             varchar                              not null,
               "startDate"      timestamp                            not null,
               "redemptionDate" timestamp,
               "currentAmount"  integer                              not null,
               "appliedAmount"  integer                              not null,
               "userId"         integer                              not null,
               "createdAt"      timestamp default now()              not null,
               updated_at       timestamp default now()              not null,
               "typeId"         uuid
                   constraint "FK_ded95b6898c28f476ed7b2dff06"
                       references ${TableNamesEnum.INVESTMENT_TYPE}
           )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE ${this.TABLE_NAME}`);
  }
}
