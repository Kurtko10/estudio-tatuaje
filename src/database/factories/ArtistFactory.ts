import { faker } from "@faker-js/faker";
import { Artist } from "../../models/Artist";
import { Factory } from "./Factory";

export class ArtistFactory extends Factory<Artist>{
    protected generate(): Artist {

        
        return{
            
          
            specialty: faker.helpers.arrayElement([
                "BlackWhite", 
                "Realista",
                "Pircing",
                "Laser"
            ]),
            biography: faker.person.bio(),
            portfolio: faker.image.urlLoremFlickr(),
        
            }as Artist
    }
}