import { MigrationInterface, QueryRunner } from "typeorm";

export class Ads1723217452832 implements MigrationInterface {
    name = 'Ads1723217452832'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "advertisements" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "photos" jsonb NOT NULL, "price" numeric(10,2) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4818a08332624787e5b2bf82302" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4927f5ab617202cd861aca9c41" ON "advertisements" ("price") `);
        await queryRunner.query(`CREATE INDEX "IDX_e8561892339baa62bea991f352" ON "advertisements" ("createdAt") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_e8561892339baa62bea991f352"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4927f5ab617202cd861aca9c41"`);
        await queryRunner.query(`DROP TABLE "advertisements"`);
    }

}
