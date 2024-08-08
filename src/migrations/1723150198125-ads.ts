import { MigrationInterface, QueryRunner } from "typeorm";

export class Ads1723150198125 implements MigrationInterface {
    name = 'Ads1723150198125'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "advertisements" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "photos" text NOT NULL, "price" numeric(10,2) NOT NULL, CONSTRAINT "PK_4818a08332624787e5b2bf82302" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "advertisements"`);
    }

}
