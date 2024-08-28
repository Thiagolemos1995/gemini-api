import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1724858857921 implements MigrationInterface {
  name = 'Migration1724858857921';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "measure" DROP CONSTRAINT "UQ_0cd8bb8b89d52c71e4b5e50cca3"`,
    );
    await queryRunner.query(`ALTER TABLE "measure" DROP COLUMN "measure_id"`);
    await queryRunner.query(
      `ALTER TABLE "measure" ADD CONSTRAINT "UQ_ddc1ad2a86717cedc808809423e" UNIQUE ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "measure" DROP COLUMN "measure_date"`);
    await queryRunner.query(
      `ALTER TABLE "measure" ADD "measure_date" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "measure" DROP COLUMN "measure_date"`);
    await queryRunner.query(
      `ALTER TABLE "measure" ADD "measure_date" TIMESTAMP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "measure" DROP CONSTRAINT "UQ_ddc1ad2a86717cedc808809423e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "measure" ADD "measure_id" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "measure" ADD CONSTRAINT "UQ_0cd8bb8b89d52c71e4b5e50cca3" UNIQUE ("measure_id")`,
    );
  }
}
