import { User } from "../../models/User";
import { Factory } from "./Factory";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";


export class UserFactory extends Factory<User>{
    protected generate(): User {
        return {
            
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            password: bcrypt.hashSync("12345678",10),
            phone: faker.phone.number(),
            email: faker.internet.email(),
            // registrationDate:faker.date.anytime(),
            isActive: true,

        }as User
    }
}