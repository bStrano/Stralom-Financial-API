import { MigrationInterface, QueryRunner } from 'typeorm';
import { TableNamesEnum } from '../../../shared/constants/enums/TableNamesEnum';

export class CreateTag1685576219235 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE ${TableNamesEnum.TAG}
       (
           id    uuid default uuid_generate_v4() not null
               constraint "PK_tag"
                   primary key,
           name  varchar(255)                         not null,
           color varchar(7)                         not null,
           "createdAt"  timestamp default now()              not null,
           updated_at   timestamp default now()              not null,
           "userId"     integer                              not null
       )`,
    );

    await queryRunner.query(
      `CREATE TABLE ${TableNamesEnum.TAG_TRANSACTION}
       (
           "transactionId" uuid                      not null
               constraint "FK_transaction_transaction_tag"
               references ${TableNamesEnum.TRANSACTION},
           "tagId"  uuid                              not null
               constraint "FK_tag_transaction_tag"
                references ${TableNamesEnum.TAG},
            "createdAt"  timestamp default now()              not null,
           updated_at   timestamp default now()              not null
       )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TableNamesEnum.TAG_TRANSACTION);
    await queryRunner.dropTable(TableNamesEnum.TAG);
  }
}
