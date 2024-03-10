import { MigrationInterface, QueryRunner,Table } from "typeorm";

export class CreateServiceTable1709968077108 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    
        await queryRunner.createTable(new Table({

            name: 'services',
            columns:[
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: "100",
                },
                {
                    name: 'description',
                    type: 'text',
                },
                {
                    name: 'execution_time',
                    type: 'int', // Duración en minutos
                },
            ]
        }),
        true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable('services');
    }

}
