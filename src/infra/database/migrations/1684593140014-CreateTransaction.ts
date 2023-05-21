import { MigrationInterface, QueryRunner } from 'typeorm';
import { TableNamesEnum } from '../../../shared/constants/enums/TableNamesEnum';

export class CreateTransaction1684593140014 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `create table ${TableNamesEnum.TRANSACTION}
           (
               id           uuid      default uuid_generate_v4() not null
                   constraint "PK_89eadb93a89810556e1cbcd6ab9"
                       primary key,
               description  varchar                              not null,
               value        integer                              not null,
               type         varchar                              not null,
               "userId"     integer                              not null,
               "createdAt"  timestamp default now()              not null,
               updated_at   timestamp default now()              not null,
               date         date                                 not null,
               "categoryId" uuid
                   constraint "FK_d3951864751c5812e70d033978d"
                       references ${TableNamesEnum.TRANSACTION_CATEGORY}
           )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE ${TableNamesEnum.TRANSACTION}`);
  }
}
