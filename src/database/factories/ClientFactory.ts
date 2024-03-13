import { Client } from "../../models/Client";
import { Factory } from "./Factory";
import { faker } from "@faker-js/faker";

export class ClientFactory extends Factory<Client>{
    protected generate(): Client {
        return{
            provincia: faker.location.city(),
        }as Client;
    }
}