import { ClientSeeder } from "./ClientSeeder";
import { RoleSeeder } from "./RoleSeeder";
import { UserSeeder } from "./UserSeeder";

(async () =>{


    console.log('starting seeders');
    
await new RoleSeeder().start();
await new UserSeeder().start();
await new ClientSeeder().start();


})();


