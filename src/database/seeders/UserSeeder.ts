import { SeederConfig } from "../../config/seeders";
import { UserRoles } from "../../constants/UserRoles";
import { getRandomSubarray } from "../../helpers/common";

import { User } from "../../models/User";
import { UserFactory } from "../factories/UserFactory";
import { Seeder } from "./Seeder";
export class UserSeeder extends Seeder{
    protected async  generate(): Promise<void> {
        const {ADMINS, MANAGERS, CLIENTS, ARTISTS, APPOINTMENT, COMPLETED_APPOINTMENT}=SeederConfig;

        const userFactory = new UserFactory();

        //admins
        const adminUsers = userFactory.createMany(ADMINS);
        adminUsers.forEach((user, i)=>{
            user.role = UserRoles.ADMIN;
            user.email = `admin${i+1}@admin.com`;
        });

        //managers

        const managerUsers = userFactory.createMany(MANAGERS);
        managerUsers.forEach((user, i)=> {
            user.role = UserRoles.MANAGER;
            user.email = `manager${i + 1}@manager.com`
            
        });

        //clientes

        const clientUsers = userFactory.createMany(CLIENTS);
        clientUsers.forEach((user)=> {
            user.role = UserRoles.CLIENT;
            //user.favoriteBooks = getRandomSubarray(books,FAVORITE_BOOKS_PER_USER );

        });

        //save

        const allUsers = [...adminUsers,...managerUsers,...clientUsers];
        await User.save(allUsers);



    }
}