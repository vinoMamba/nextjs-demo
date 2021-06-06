import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1622730574912 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment"},
                {name: "username", type: "varchar"},
                {name: "passwordDigest", type: "varchar"},
                {name: "createdAt", type: "timestamp", isNullable: false, default: "now()"},
                {name: "updatedAt", type: "timestamp", isNullable: false, default: "now()"}
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
