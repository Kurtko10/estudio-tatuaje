import { Request, Response } from "express";
import { User } from "../models/User";
import { Client } from "../models/Client";
import { Like } from "typeorm";
import bcrypt from "bcrypt";
import { Artist } from "../models/Artist";
import { UserRoles } from "../constants/UserRoles";


export const userController = {

// Crear usuario--------

async create(req: Request, res: Response): Promise<void> {
  try {
      const { firstName, lastName, email, phone, password, isActive, roleId } = req.body;

      if (!firstName || !lastName || !phone || !email || !password || !isActive || !roleId) {
          res.status(400).json({ message: "All fields must be provided" });
          return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Crear y guardar el usuario
      const newUser = User.create({
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
          password: hashedPassword,
          isActive: isActive,
          role: roleId,
      });
      await newUser.save();

      
      if (roleId === 2) {
          const newArtist = Artist.create({
              name: lastName,
              specialty: 'Especialidad', 
              user: newUser, 
          });
          await newArtist.save();
      } else if (roleId === 3) {
          const newClient = Client.create({
              lastName: lastName,
              provincia: "Provincia", 
              user: newUser, 
          });
          await newClient.save();
      }

      res.status(200).json({ message: "User has been created" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al crear usuario" });
  }
},



  // Eliminar usuario
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const userId = Number(req.params.id);

      const deleteResult = await User.delete(userId);

      if (deleteResult.affected === 0) {
        res.status(404).json({ message: "Usuario no existe" });
        return;
      }

      res.status(200).json({ message: `Usuario con ID: ${userId} ELIMINADO`});
    } catch (error) {
      res.status(500).json({ message: "Error al borrar" });
    }
  },

// Listar usuarios, para ADMIN -------

async getAllUsers(req: Request, res: Response): Promise<void> {
  try {
      const [users, totalUsers] = await User.findAndCount({
          relations:{
              role:true,
          },
      }); 
      if (totalUsers === 0) {
          res.status(404).json({ message: "Users not found" });
          return;
        }
      res.json(users); 
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
  }
},
  
// Mostrar usuarios por ID de rol-------

async getArtist(req: Request, res: Response): Promise<void> {
  try {
            const artists = await Artist.findAndCount({
                relations: ["user"],
                select: {
                    id: true,
                    name: true,
                    specialty: true,
                    biography: true,
                    portfolio: true,
                    user: {
                        firstName: true,
                        email: true,
                        phone: true,
                    },
                },
            });
            res.json(artists);
        } catch (error) {
            res.status(500).json({ message: "Internal server error" });
        }
},

// Mostrar usuario por ID----------
async getById(req: Request, res: Response): Promise<void> {
  try {
    const userId = Number(req.params.id);

    if (!userId || userId <= 0) {
      res.status(400).json({ message: "Invalid user ID" });
      return;
    }

    // Recuperar los datos del usuario y sus relaciones con otras tablas
    const user = await User.findOne({
      relations: ["role", "clients", "artists"], // Incluir relaciones con otras tablas
      where: { id: userId }
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

// Verificar si el usuario es un cliente y obtener los datos de la tabla "clients"
if (user.clients) {
  // Verificar si hay al menos un cliente asociado al usuario
  if (user.clients.length > 0) {
    const client = await Client.findOne({ where: { id: user.clients[0].id } });
    if (client) {
      user.clients[0] = client; // Asignar los datos del cliente al usuario
    }
  }
}



    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
},



// Actualizar datos de usuario
async  update(req: Request<{ id: string }, {}, Partial<User>>, res: Response): Promise<void> {
  try {
      const userId = Number(req.params.id);
      const { password, role, ...userData } = req.body;

      const userToUpdate = await User.findOne({
          where: { id: userId },
      });

      if (!userToUpdate) {
          res.status(404).json({ message: "User not found" });
          return;
      }

      if (password) {
          const hashedPassword = await bcrypt.hash(password, 10);
          userToUpdate.password = hashedPassword;
      }

      const updateUser: Partial<User> = {
        ...userToUpdate,
        ...userData,
      };

      await User.save(updateUser);

      res.status(202).json({ message: "User updated successfully" });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to update user" });
  }
},

// Actualizar perfil

async updateProfile(
  req: Request<{  }, {}, Partial<User>>,
  res: Response
): Promise<void> {
  try {
    const userId = req.tokenData.userId;
    const { password, role, ...resUserData } = req.body;

    const userToUpdate = await User.findOne({
      where: { id: userId },
    });

    if (!userToUpdate) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (password) {
      const hashedPassword = bcrypt.hashSync(password, 10);
      userToUpdate.password = hashedPassword;
    }

    Object.assign(userToUpdate, resUserData);

    await User.save(userToUpdate);

    const clientToUpdate = await Client.findOne({
      where: { user: userToUpdate },
    });

    if (clientToUpdate) {
      Object.assign(clientToUpdate, resUserData);
      await Client.save(clientToUpdate);
    }

    res.status(202).json({ message: "User update successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update user" });
  }
},

  // Ver perfil usuario-----------

  async getProfile(req: Request, res: Response): Promise<void> {
    try {
        const userId = req.tokenData.userId;

 
        const user = await User.findOne({
            relations: ["role", "clients", "artists"],
            where: { id: userId }
        });

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        if (user.role && user.role.name === "admin") {
           
            delete user.clients;
            delete user.artists;
        } else if (user.artists && user.artists.length > 0) {
           
            delete user.clients;
        } else {
          
            delete user.artists;
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to retrieve user profile" });
    }
},


  // Ver clientes por ID client
    async getByClientRole(req: Request, res: Response): Promise<void> {
        try {
            const roleId = 3; 
    
            const users = await User.find({
                where: {
                    role: { id: roleId }
                }
            });
    
            if (users.length === 0) {
                res.status(404).json({ message: "No users found with this role" });
                return;
            }
    
            res.json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    

      //Usuario por coincidencia de nombre----------

  async getUserByName(req: Request, res: Response): Promise<void> {
    try {
      let userName: string = req.params.name;

      userName = userName.trim().toLowerCase();

      const users = await User.find({
        where: { lastName: Like(`${userName}%`) },
      });

      if (users.length === 0) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

};