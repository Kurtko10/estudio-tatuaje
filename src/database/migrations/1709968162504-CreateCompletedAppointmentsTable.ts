// import { MigrationInterface, QueryRunner, Table } from "typeorm";

// export class CreateCompletedAppointmentsTable1709968162504 implements MigrationInterface {

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.createTable(new Table({
//             name: 'completed_appointments',
//             columns: [
//                 {
//                     name: 'id',
//                     type: 'int',
//                     isPrimary: true,
//                     isGenerated: true,
//                     generationStrategy: 'increment',
//                 },
//                 {
//                     name: 'appointment_id',
//                     type: 'int',
//                 },
//                 {
//                     name: 'client_id',
//                     type: 'int',
//                 },
//                 {
//                     name: 'completed_date',
//                     type: 'datetime',
//                 },
//             ],
//             foreignKeys: [
//                 {                
//                     columnNames: ['appointment_id'],
//                     referencedColumnNames: ['id'],
//                     referencedTableName: 'appointments',
//                 },
//                 {
//                     columnNames: ['client_id'],
//                     referencedColumnNames: ['id'],
//                     referencedTableName: 'clients',
//                 },
            
//             ],
                
//         }), 
//         true);
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {

//         await queryRunner.dropTable('completed_appointments');
//     }

// }
