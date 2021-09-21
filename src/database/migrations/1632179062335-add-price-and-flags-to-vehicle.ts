import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addPriceAndFlagsToVehicle1632179062335 implements MigrationInterface {

    newPriceColumn = new TableColumn({
        name: 'price',
        type: 'decimal',
        precision: 10,
        scale: 2
    });

    newToLikeColumn = new TableColumn({
        name: 'is_to_like',
        type: 'boolean',
        isNullable: false,
        default: false
    });

    newToSaleColumn = new TableColumn({
        name: 'is_for_sale',
        type: 'boolean',
        isNullable: false,
        default: false
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("vehicle",this.newPriceColumn);
        await queryRunner.addColumn("vehicle",this.newToLikeColumn);
        await queryRunner.addColumn("vehicle", this.newToSaleColumn);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("vehicle",this.newPriceColumn.name);
        await queryRunner.dropColumn("vehicle",this.newToLikeColumn.name);
        await queryRunner.dropColumn("vehicle", this.newToSaleColumn.name);
    }

}
