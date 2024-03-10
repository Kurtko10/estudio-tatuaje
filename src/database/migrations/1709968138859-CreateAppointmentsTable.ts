import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateAppointmentsTable1709968138859 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    
        await queryRunner.createTable(new Table({
            name: 'appointments',
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
                    name: 'artist_id',
                    type: 'int',
                },
                {
                    name: 'service_id',
                    type: 'int',
                },
                {
                    name: 'datetime',
                    type: 'datetime',
                },
                {
                    name: 'status',
                    type: 'varchar',
                    length: "20",
                },
            ]
        }), true);

         // Crear claves foráneas
         await queryRunner.createForeignKeys('appointments', [
            new TableForeignKey({
                columnNames: ['client_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'clients',
                onDelete: 'CASCADE',
            }),
            new TableForeignKey({
                columnNames: ['artist_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'artists',
                onDelete: 'CASCADE',
            }),
            new TableForeignKey({
                columnNames: ['service_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'services',
                onDelete: 'CASCADE',
            }),
        ]);
    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
