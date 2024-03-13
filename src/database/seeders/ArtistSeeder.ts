import { SeederConfig } from "../../config/seeders";
import { Seeder } from "./Seeder";
import { User } from "../../models/User";
import { UserRoles } from "../../constants/UserRoles";
import { ArtistFactory } from "../factories/ArtistFactory";
import { Artist } from "../../models/Artist";

export class ArtistSeeder extends Seeder{
    protected async generate(): Promise<void> {
        

        const { MANAGERS} = SeederConfig;

        // Obtener todos los usuarios existentes
        const users = await User.find({where:{role:UserRoles.MANAGER}});

        const artists = new ArtistFactory().createMany(MANAGERS);
        artists.forEach((artist, index) => {
            // Asigna el ID del usuario al cliente
            artist.user = users[index];
            // Asigna el lastName del usuario al cliente
            artist.name = users[index].lastName;
        });

        // Guardar los clientes
        await Artist.save(artists);
    }
}