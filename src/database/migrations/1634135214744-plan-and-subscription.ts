import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class planAndSubscription1634135214744 implements MigrationInterface {

    tablePlan = new Table({
        name: 'plan',
        columns:[
            {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment'
            },
            {
                name: 'plan_type',
                type: 'varchar',
                length: '255',
                isNullable: false
            },
            {
                name: 'price',
                type: 'decimal',
                precision: 10,
                scale: 2
            }
        ],
    });

    tableUserSubscription = new Table({
        name: 'user_subscription',
        columns:[
            {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment'
            },
            {
                name: 'active',
                type: 'boolean',
                isNullable: false,
                default: true
            },
            {
                name: 'user_id',
                type: 'int'
            },
            {
                name: 'plan_id',
                type: 'int'
            },
            {
                name: 'start_date',
                type: 'timestamp',
                isNullable: false
            },
            {
                name: 'end_date',
                type: 'timestamp',
                isNullable: false
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

    planForeignKey = new TableForeignKey({
        columnNames: ["plan_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "plan",
        onDelete: 'CASCADE'
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            this.tablePlan
        );
        await queryRunner.createTable(
            this.tableUserSubscription
        );
        await queryRunner.createForeignKey(this.tableUserSubscription.name, this.userForeignKey);
        await queryRunner.createForeignKey(this.tableUserSubscription.name, this.planForeignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(this.tableUserSubscription.name, this.userForeignKey);
        await queryRunner.dropForeignKey(this.tableUserSubscription.name, this.planForeignKey);
        await queryRunner.dropTable(this.tableUserSubscription.name);
        await queryRunner.dropTable(this.tablePlan.name);
    }

}
