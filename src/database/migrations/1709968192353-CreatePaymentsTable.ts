import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePaymentsTable1709968192353 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    
        await queryRunner.createTable(new Table({
            name: 'payments',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'client_id',
                    type: 'int',
                },
                {
                    name: 'date',
                    type: 'datetime',
                },
                {
                    name: 'amount',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                },
                {
                    name: 'payment_method',
                    type: 'varchar',
                },
                {
                    name: 'status',
                    type: 'boolean',
                    default: false,
                },
            ],
            foreignKeys: [
                {
                    columnNames: ['client_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'clients',
                },
                {
                    columnNames: ['appointment_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'appointments',
                    onDelete: 'CASCADE',
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('payments');
    }

}
