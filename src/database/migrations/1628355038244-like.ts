import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class like1628355038244 implements MigrationInterface {

    table = new Table({
        name: 'like_interest',
        columns:[
            {
                name: 'like_id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment'
            },
            {
                name: 'type',
                type: 'varchar',
                length: '255',
                isNullable: false
            },
            {
                name: 'matched',
                type: 'boolean',
                isNullable: false,
                default: false
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
                name: 'vehicle_id',
                type: 'int'
            },
            {
                name: 'user_id',
                type: 'int'
            }
        ]
    });

    vehicleForeignKey = new TableForeignKey({
        columnNames: ["vehicle_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "vehicle",
        onDelete: 'CASCADE'
    });

    userForeignKey = new TableForeignKey({
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "vehicle",
        onDelete: 'CASCADE'
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            this.table
        );
        await queryRunner.createForeignKey("like_interest", this.userForeignKey);
        await queryRunner.createForeignKey("like_interest", this.vehicleForeignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("like_interest", this.userForeignKey);
        await queryRunner.dropForeignKey("like_interest", this.vehicleForeignKey);
        await queryRunner.dropTable('like_interest');
    }

}
