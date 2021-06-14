import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class image1621814430765 implements MigrationInterface {

    table = new Table({
        name: 'image',
        columns:[
            {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment'
            },
            {
                name: 'key',
                type: 'varchar',
                length: '255',
                isNullable: true
            },
            {
                name: 'file_name',
                type: 'varchar',
                length: '255',
            },
            {
                name: 'file_content_type',
                type: 'varchar',
                length: '255',
            },
            {
                name: 's3_name',
                type: 'varchar',
                length: '255',
                isNullable: true
            },
            {
                name: 'file',
                type: 'text'
            },
            {
                name: 'processed',
                type: 'boolean',
                isNullable: false,
                default: false
            },
            {
                name: 'vehicle_id',
                type: 'int'
            }
        ]
    });

    foreignKey = new TableForeignKey({
        columnNames: ["vehicle_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "vehicle",
        onDelete: 'CASCADE'
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            this.table
        );
        await queryRunner.createForeignKey("image", this.foreignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("image", this.foreignKey);
        await queryRunner.dropTable(this.table);
    }

}
