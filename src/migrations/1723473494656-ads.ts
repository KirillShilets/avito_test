import { MigrationInterface, QueryRunner } from "typeorm";

export class Ads1723473494656 implements MigrationInterface {
    name = 'Ads1723473494656'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "photos" ("id" SERIAL NOT NULL, "main_photo" character varying(400) NOT NULL, "second_photo" character varying(400), "third_photo" character varying(400), "ad_id" integer, CONSTRAINT "REL_faf0743baa107a0870c3477bd6" UNIQUE ("ad_id"), CONSTRAINT "PK_5220c45b8e32d49d767b9b3d725" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "advertisements" DROP COLUMN "photos"`);
        await queryRunner.query(`ALTER TABLE "photos" ADD CONSTRAINT "FK_faf0743baa107a0870c3477bd68" FOREIGN KEY ("ad_id") REFERENCES "advertisements"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "photos" DROP CONSTRAINT "FK_faf0743baa107a0870c3477bd68"`);
        await queryRunner.query(`ALTER TABLE "advertisements" ADD "photos" jsonb NOT NULL`);
        await queryRunner.query(`DROP TABLE "photos"`);
    }

}
