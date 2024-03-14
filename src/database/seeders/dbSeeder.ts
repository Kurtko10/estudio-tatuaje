import { ne } from "@faker-js/faker";
import { ClientSeeder } from "./ClientSeeder";
import { RoleSeeder } from "./RoleSeeder";
import { UserSeeder } from "./UserSeeder";
import { ArtistSeeder } from "./ArtistSeeder";
import { ServiceSeeder } from "./ServiceSeeder";
import { AppointmentSeeder } from "./AppointmentSeeder";


(async () =>{


    console.log('starting seeders');
    
await new RoleSeeder().start();
await new UserSeeder().start();
await new ClientSeeder().start();
await new ArtistSeeder().start();
await new ServiceSeeder().start();
await new AppointmentSeeder().start();
//await new CompletedAppointmentSeeder().start();
})();


