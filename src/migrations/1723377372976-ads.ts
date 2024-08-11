import { MigrationInterface, QueryRunner } from "typeorm";

export class Ads1723377372976 implements MigrationInterface {
    name = 'Ads1723377372976'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_e8561892339baa62bea991f352"`);
        await queryRunner.query(`ALTER TABLE "advertisements" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "advertisements" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "advertisements" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "advertisements" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "advertisements" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "advertisements" ADD "name" character varying(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "advertisements" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "advertisements" ADD "description" character varying(1000) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "advertisements" ALTER COLUMN "price" TYPE numeric(10,0)`);
        await queryRunner.query(`CREATE INDEX "IDX_6c0833d57075513f52e0e44737" ON "advertisements" ("created_at") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_6c0833d57075513f52e0e44737"`);
        await queryRunner.query(`ALTER TABLE "advertisements" ALTER COLUMN "price" TYPE numeric(10,2)`);
        await queryRunner.query(`ALTER TABLE "advertisements" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "advertisements" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "advertisements" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "advertisements" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "advertisements" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "advertisements" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "advertisements" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "advertisements" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`CREATE INDEX "IDX_e8561892339baa62bea991f352" ON "advertisements" ("createdAt") `);
    }

}
