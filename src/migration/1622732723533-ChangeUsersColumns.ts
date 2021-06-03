import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class ChangeUsersColumns1622732723533 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn("users", "password", new TableColumn({name: "password", type: "varchar"}));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn("users", "password", new TableColumn({name: "password", type: "text"}));
    }

}
