import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class vehicle1621726913252 implements MigrationInterface {

    table = new Table({
        name: 'vehicle',
        columns:[
            {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment'
            },
            {
                name: 'brand',
                type: 'varchar',
                length: '255',
            },
            {
                name: 'year',
                type: 'int',
            },
            {
                name: 'doors_number',
                type: 'int',
                isNullable: true
            },
            {
                name: 'kilometers',
                type: 'int',
                isNullable: true
            },
            {
                name: 'color',
                type: 'varchar',
                length: '255',
                isNullable: true
            },
            {
                name: 'model',
                type: 'varchar',
                length: '255',
            },
            {
                name: 'fuel_type',
                type: 'varchar',
                length: '255',
                isNullable: true
            },
            {
                name: 'transmission_type',
                type: 'varchar',
                length: '255',
                isNullable: true
            },
            {
                name: 'category',
                type: 'varchar',
                length: '255',
                isNullable: true
            },
            {
                name: 'details',
                type: 'text',
                isNullable: true
            },
            {
                name: 'user_id',
                type: 'int'
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
            }
        ],
        
    });

    foreignKey = new TableForeignKey({
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "user",
        onDelete: 'CASCADE'
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            this.table
        );
        await queryRunner.createForeignKey("vehicle", this.foreignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("vehicle", this.foreignKey);
        await queryRunner.dropTable('vehicle');
    }

}
