import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class reportVehicleEntity1633388827190 implements MigrationInterface {

    table = new Table({
        name: 'report',
        columns:[
            {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment'
            },
            {
                name: 'description',
                type: 'text',
                isNullable: false
            },
            {
                name: 'user_id',
                type: 'int'
            },
            {
                name: 'vehicle_id',
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

    userForeignKey = new TableForeignKey({
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "user",
        onDelete: 'CASCADE'
    });

    vehicleForeignKey = new TableForeignKey({
        columnNames: ["vehicle_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "vehicle",
        onDelete: 'CASCADE'
    });


    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            this.table
        );
        await queryRunner.createForeignKey("report", this.userForeignKey);
        await queryRunner.createForeignKey("report", this.vehicleForeignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("report", this.userForeignKey);
        await queryRunner.dropForeignKey("report", this.vehicleForeignKey);
        await queryRunner.dropTable('report');
    }

}
