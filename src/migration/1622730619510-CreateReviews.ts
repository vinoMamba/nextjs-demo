import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateReviews1622730619510 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "reviews",
            columns: [
                {name: "id", type: "int", isPrimary: true, isGenerated: true, generationStrategy: "increment"},
                {name: "userId", type: "int"},
                {name: "postId", type: "int"},
                {name: "content", type: "text"},
                {name: "createdAt", type: "timestamp", isNullable: false, default: "now()"},
                {name: "updatedAt", type: "timestamp", isNullable: false, default: "now()"}
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("reviews");
    }

}
