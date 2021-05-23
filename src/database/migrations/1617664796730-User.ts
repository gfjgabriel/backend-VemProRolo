import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class User1617664796730 implements MigrationInterface {

    table = new Table({
        name: 'user',
        columns:[
            {
                name: 'id',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment'
            },
            {
                name: 'full_name',
                type: 'varchar',
                length: '255',
                isNullable: false,
            },
            {
                name: 'email',
                type: 'varchar',
                length: '255',
                isNullable: false,
                isUnique: true,
            },
            {
                name: 'password_hash',
                type: 'varchar',
                length: '60',
                isNullable: false,
            },
            {
                name: 'phone',
                type: 'varchar',
                length: '60',
                isNullable: true,
            },
            {
                name: 'is_email_verified',
                type: 'boolean',
                isNullable: true,
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
            }
        ]
    });

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            this.table
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user');
    }

}
