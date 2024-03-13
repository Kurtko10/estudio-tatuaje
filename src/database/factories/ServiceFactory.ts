import { Service}   from "../../models/Service";
import { Factory } from "./Factory";
import { faker } from "@faker-js/faker";


export class ServiceFactory extends Factory<Service>{
    protected generate(): Service {
        return {
            
            name: faker.helpers.arrayElement([
                "BlackWhite", 
                "Realista",
                "Pircing",
                "Laser"
            ]),
            description: faker.lorem.text(),
            executionTime:faker.number.int({min:15, max:300}),

        }as Service
    }
}