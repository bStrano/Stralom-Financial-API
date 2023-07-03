import { In, MigrationInterface, QueryRunner } from 'typeorm';
import { TransactionCategory } from '../../../modules/transaction/entities/transaction-category.entity';
import { v4 as uuidv4 } from 'uuid';

export class PopulateTransactionCategories1671637366183 implements MigrationInterface {
  readonly values = [
    { id: uuidv4(), color: '#2f4b7c', icon: 'restaurant', name: 'Supermercado' },
    { id: uuidv4(), color: '#ff7c43', icon: 'DirectionsCar', name: 'Transporte' },
    { id: uuidv4(), color: '#30BFBF', icon: 'restaurant', name: 'Restaurante' },
    { id: uuidv4(), color: '#6e9d3f', icon: 'LocalAirport', name: 'Viagem' },
    { id: uuidv4(), color: '#779933', icon: 'Home', name: 'Casa' },
    { id: uuidv4(), color: '#0092CC', icon: 'School', name: 'Educação' },
    { id: uuidv4(), color: '#d45087', icon: 'VideogameAsset', name: 'Eletrônicos' },
    { id: uuidv4(), color: '#665191', icon: 'SportsSoccer', name: 'Lazer' },
    { id: uuidv4(), color: '#a05195', icon: 'Apps', name: 'Outros' },
    { id: uuidv4(), color: '#ffa600', icon: 'LocalHospital', name: 'Saude' },
    { id: uuidv4(), color: '#6e9d3f', icon: 'BeachAccess', name: 'Viagem' },
    { id: uuidv4(), color: '#6e9d3f', icon: 'Pets', name: 'Animals' },
    { id: uuidv4(), color: '#6e9d3f', icon: 'Security', name: 'Segurança' },
    { id: uuidv4(), color: '#ffa600', icon: 'Security', name: 'Vestuário' },
    { id: uuidv4(), color: '#312548', icon: 'Security', name: 'Salario' },
    { id: uuidv4(), color: '#000000', icon: 'Security', name: 'Serviços' },
    { id: uuidv4(), color: '#DCD427', icon: 'Security', name: 'Impostos' },
    { id: uuidv4(), color: '#323232', icon: 'Security', name: 'Presente' },
    { id: uuidv4(), color: '#003f5c', icon: 'Security', name: 'Software' },
    { id: '487b4b3a-f9e5-476a-bbe2-e226a5cc6adc', color: '#54d62c', icon: 'Security', name: 'Investimentos' },
  ];
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.createQueryBuilder().insert().into(TransactionCategory).values(this.values).execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.delete(TransactionCategory, { id: In(this.values.map((item) => item.id)) });
  }
}
