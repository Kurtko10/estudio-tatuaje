import { Request, Response } from "express";
import { User } from "../models/User";
import { Client } from "../models/Client";
import { Like } from "typeorm";
import bcrypt from "bcrypt";
import { Role } from "../models/Role";
import { Appointment } from "../models/Appointment";
import { Artist } from "../models/Artist";
import { Service } from "../models/Service";


export const userController = {

// Crear usuario--------

async create(req:Request,res:Response){
    try {
        const {firstName,lastName,email,phone,password,isActive,roleId} = req.body;

        if (
            !firstName ||
            !lastName ||
            !phone ||
            !email ||
            !password ||
            !isActive ||
            ! roleId
          ) {
            res.status(400).json({
              message: "All fields must be provided",
            });
            return;
          }

        const hashedPassword = await bcrypt.hash(password,10);
        
        const newUser = User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            password:hashedPassword,
            isActive:isActive,
            role:roleId,

        });
        await newUser.save();

        res.status(200).json({message:"User has been created"});
    }catch(error){
        console.error(error);
        res.status(500).json({message:"Error al crear usuario"});
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

// Mostrar usuario por ID----------

    async getById(req: Request, res: Response): Promise<void> {
        try {
          const userId = Number(req.params.id);
    
          if (!userId || userId <= 0) {
            res.status(400).json({ message: "Invalid user ID" });
            return;
          }
    
          const user = await User.findOne({ where: { id: userId } });
    
          if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
          }
    
          res.json(user);
        } catch (error) {
          res.status(500).json({ message: "Internal server error" });
        }
      },

// Mostrar usuarios por ID de rol-------

    async getByRole(req: Request, res: Response): Promise<void> {
        try {
            const roleId = Number(req.params.roleId);

            const users = await User.find({
                where: {
                role:{ id:roleId} } });

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

    async getByClientRole(req: Request, res: Response): Promise<void> {
        try {
            const roleId = 3; // ID del rol de cliente
    
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