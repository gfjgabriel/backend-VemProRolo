import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class modelBrandCreate1628547483859 implements MigrationInterface {

    tableBrand = new Table(
        {
            name: 'brand',
            columns:[
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '255',
                    isNullable:false
                }
            ]
        }
    );

    tableModel = new Table(
        {
            name: 'model',
            columns:[
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '255',
                    isNullable:false
                },
                {
                    name: 'brand_id',
                    type: 'int'
                }
            ]
        }
    );

    foreignKeyBrand = new TableForeignKey({
        columnNames: ["brand_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "brand"
    });    

    
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            this.tableBrand
        );
        await queryRunner.createTable(
            this.tableModel
        );
        await queryRunner.createForeignKey("model", this.foreignKeyBrand);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("model", this.foreignKeyBrand);
        await queryRunner.dropTable('model');
        await queryRunner.dropTable('brand');
    }

}
