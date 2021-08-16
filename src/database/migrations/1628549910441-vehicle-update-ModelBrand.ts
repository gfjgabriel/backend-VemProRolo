import {Column, MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export class vehicleUpdateModelBrand1628549910441 implements MigrationInterface {

    newModelColumn = new TableColumn({
        name: 'model_id',
        type: 'int'
    });

    brandColumn = new TableColumn({
        name: 'brand',
        type: 'varchar',
        length: '255'
    });

    modelColumn = new TableColumn({
        name: 'model',
        type: 'varchar',
        length: '255',
    });
    
    foreignKeyModel = new TableForeignKey({
        columnNames: ["model_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "model"
    });  

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("vehicle","brand")
        await queryRunner.dropColumn("vehicle","model")
        await queryRunner.addColumn("vehicle",this.newModelColumn);
        await queryRunner.createForeignKey("vehicle", this.foreignKeyModel);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("vehicle",this.brandColumn);
        await queryRunner.addColumn("vehicle",this.modelColumn);
        await queryRunner.dropForeignKey("vehicle", this.foreignKeyModel);
        await queryRunner.dropColumn("vehicle","model_id")
    }

}
