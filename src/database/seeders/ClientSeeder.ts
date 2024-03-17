// import { SeederConfig } from "../../config/seeders";
// import { Client } from "../../models/Client";
// import { ClientFactory } from "../factories/ClientFactory";
// import { Seeder } from "./Seeder";
// import { User } from "../../models/User"; // Importa el modelo de usuario

// export class ClientSeeder extends Seeder {

//     protected async generate(): Promise<void> {
        
//         const { CLIENTS } = SeederConfig;

//         // Obtener todos los usuarios existentes
//         const users = await User.find();

//         // Crear instancias de clientes y asignar user_id correspondiente
//         const clients = new ClientFactory().createMany(CLIENTS);
//         clients.forEach((client, index) => {
//             // Suponiendo que cada cliente se asocia con un usuario en orden
//             client.user = users[index]; // Asigna el usuario correspondiente al cliente
//         });

//         // Guardar los clientes
//         await Client.save(clients);
//     }
// }


import { SeederConfig } from "../../config/seeders";
import { Client } from "../../models/Client";
import { ClientFactory } from "../factories/ClientFactory";
import { Seeder } from "./Seeder";
import { User } from "../../models/User";
import { UserRoles } from "../../constants/UserRoles";

export class ClientSeeder extends Seeder {

    // Crear cliente
    protected async generate(): Promise<void> {
        
        const { CLIENTS } = SeederConfig;
        const users = await User.find({where:{role:UserRoles.CLIENT}});
        const clients = new ClientFactory().createMany(CLIENTS);
       
        clients.forEach((client, index) => {
            client.user = users[index];
            client.lastName = users[index].lastName;
        });

        await Client.save(clients);
    }
}


