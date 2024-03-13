import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateClientsTable1709968025617 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.createTable(new Table({
            name: 'clients',
            columns:[
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'user_id',
                    type: 'int',
                },
                {
                    name: 'lastName',
                    type: 'varchar',
                    length: "50",
                },
             
                {
                    name: 'provincia',
                    type: 'varchar',
                    length: "100",
                },
            ],
            foreignKeys:[
                {
                    columnNames: ['user_id'],
                    referencedTableName: 'users',
                    referencedColumnNames:['id'],
                    onDelete: 'CASCADE',
                },
            ],

        }), 
        true
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable("clients");
    }

}
