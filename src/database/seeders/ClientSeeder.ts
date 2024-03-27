
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


