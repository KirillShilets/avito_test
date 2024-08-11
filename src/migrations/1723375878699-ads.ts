import { MigrationInterface, QueryRunner } from "typeorm";

export class Ads1723375878699 implements MigrationInterface {
    name = 'Ads1723375878699'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertisements" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "advertisements" ADD "name" character varying(200) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "advertisements" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "advertisements" ADD "description" character varying(1000) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "advertisements" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "advertisements" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "advertisements" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "advertisements" ADD "name" character varying NOT NULL`);
    }

}
