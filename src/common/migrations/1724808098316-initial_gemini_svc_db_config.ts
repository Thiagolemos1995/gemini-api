import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1724808098316 implements MigrationInterface {
  name = 'Migration1724808098316';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."measure_measure_type_enum" AS ENUM('water', 'gas')`,
    );
    await queryRunner.query(
      `CREATE TABLE "measure" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "measure_id" uuid NOT NULL, "image" character varying NOT NULL, "customer_code" character varying NOT NULL, "measure_date" TIMESTAMP NOT NULL, "measure_type" "public"."measure_measure_type_enum" NOT NULL DEFAULT 'water', CONSTRAINT "UQ_0cd8bb8b89d52c71e4b5e50cca3" UNIQUE ("measure_id"), CONSTRAINT "PK_ddc1ad2a86717cedc808809423e" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "measure"`);
    await queryRunner.query(`DROP TYPE "public"."measure_measure_type_enum"`);
  }
}
