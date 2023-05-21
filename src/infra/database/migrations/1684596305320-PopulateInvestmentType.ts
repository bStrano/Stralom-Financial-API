import { In, MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { InvestmentType } from '../../../modules/investments/entities/investment-type.entity';

export class PopulateInvestmentType1684596305320 implements MigrationInterface {
  readonly values = [
    { id: uuidv4(), name: 'CDB' },
    { id: uuidv4(), name: 'LCA' },
    { id: uuidv4(), name: 'Fundos de Investimento' },
    { id: uuidv4(), name: 'Tesouro Direto - IPCA' },
  ];
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.createQueryBuilder().insert().into(InvestmentType).values(this.values).execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(InvestmentType, { id: In(this.values.map((item) => item.id)) });
  }
}
