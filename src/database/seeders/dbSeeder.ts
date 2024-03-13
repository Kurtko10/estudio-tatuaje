import { ne } from "@faker-js/faker";
import { ClientSeeder } from "./ClientSeeder";
import { RoleSeeder } from "./RoleSeeder";
import { UserSeeder } from "./UserSeeder";
import { ArtistSeeder } from "./ArtistSeeder";

(async () =>{


    console.log('starting seeders');
    
await new RoleSeeder().start();
await new UserSeeder().start();
await new ClientSeeder().start();
await new ArtistSeeder().start();


})();


