import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1727979014774 implements MigrationInterface {
  name = 'CreateTables1727979014774';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "pokemon" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "name" varchar NOT NULL,
                "attack" integer NOT NULL,
                "defense" integer NOT NULL,
                "hp" integer NOT NULL,
                "speed" integer NOT NULL,
                "type" varchar NOT NULL,
                "imageUrl" varchar NOT NULL
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "battle" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "battleDetails" text,
                "pokemon1Id" integer,
                "pokemon2Id" integer,
                "winnerId" integer
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "temporary_battle" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "battleDetails" text,
                "pokemon1Id" integer,
                "pokemon2Id" integer,
                "winnerId" integer,
                CONSTRAINT "FK_d6de3ef4c04a515afb256111fd0" FOREIGN KEY ("pokemon1Id") REFERENCES "pokemon" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT "FK_7df2fdef5c10626b94d7c7be3f0" FOREIGN KEY ("pokemon2Id") REFERENCES "pokemon" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
                CONSTRAINT "FK_0f28157daad5bdcf01ba0c6430d" FOREIGN KEY ("winnerId") REFERENCES "pokemon" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
    await queryRunner.query(`
            INSERT INTO "temporary_battle"(
                    "id",
                    "battleDetails",
                    "pokemon1Id",
                    "pokemon2Id",
                    "winnerId"
                )
            SELECT "id",
                "battleDetails",
                "pokemon1Id",
                "pokemon2Id",
                "winnerId"
            FROM "battle"
        `);
    await queryRunner.query(`
            DROP TABLE "battle"
        `);
    await queryRunner.query(`
            ALTER TABLE "temporary_battle"
                RENAME TO "battle"
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "battle"
                RENAME TO "temporary_battle"
        `);
    await queryRunner.query(`
            CREATE TABLE "battle" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "battleDetails" text,
                "pokemon1Id" integer,
                "pokemon2Id" integer,
                "winnerId" integer
            )
        `);
    await queryRunner.query(`
            INSERT INTO "battle"(
                    "id",
                    "battleDetails",
                    "pokemon1Id",
                    "pokemon2Id",
                    "winnerId"
                )
            SELECT "id",
                "battleDetails",
                "pokemon1Id",
                "pokemon2Id",
                "winnerId"
            FROM "temporary_battle"
        `);
    await queryRunner.query(`
            DROP TABLE "temporary_battle"
        `);
    await queryRunner.query(`
            DROP TABLE "battle"
        `);
    await queryRunner.query(`
            DROP TABLE "pokemon"
        `);
  }
}
