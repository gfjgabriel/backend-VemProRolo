import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class match1628355951815 implements MigrationInterface {

    table = new Table({
        name: 'match',
        columns:[
            {
                name: 'match_id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment'
            },
            {
                name: 'created_date',
                type: 'timestamp',
                isNullable: false,
                default: 'now()'
            },
            {
                name: 'updated_date',
                type: 'timestamp',
                isNullable: false,
                default: 'now()'
            },
            {
                name: 'first_like_id',
                type: 'int'
            },
            {
                name: 'second_like_id',
                type: 'int'
            }
        ]
    });

    firstLikeForeignKey = new TableForeignKey({
        columnNames: ["first_like_id"],
        referencedColumnNames: ["like_id"],
        referencedTableName: "like_interest",
        onDelete: 'CASCADE'
    });

    secondLikeForeignKey = new TableForeignKey({
        columnNames: ["second_like_id"],
        referencedColumnNames: ["like_id"],
        referencedTableName: "like_interest",
        onDelete: 'CASCADE'
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            this.table
        );
        await queryRunner.createForeignKey("match", this.firstLikeForeignKey);
        await queryRunner.createForeignKey("match", this.secondLikeForeignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("match", this.firstLikeForeignKey);
        await queryRunner.dropForeignKey("match", this.secondLikeForeignKey);
        await queryRunner.dropTable('match');
    }

}
