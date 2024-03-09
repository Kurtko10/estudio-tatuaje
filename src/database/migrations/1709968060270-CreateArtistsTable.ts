import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateArtistsTable1709968060270 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    
       await queryRunner.createTable(new Table({

        name: 'artists',
        columns: [
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
            },
            {
                name: 'specialty',
                type: 'varchar',
            },
            {
                name: 'biography', 
                type: 'text',
                isNullable: true,
            },
            {
                name: 'portfolio',
                type: 'text',
                isNullable: true,
            },
        ]
       }),
       true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('artists');
    }

}
