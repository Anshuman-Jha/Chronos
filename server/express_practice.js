import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jwt";
import middleware from "./middleware_practice";


const app = express();
const prisma = new PrismaClient();

app.use(express.json());
;

app.post("/login", async (req, res) => {

    const { email, username, password } = req.body;
    try {
        const user_exist = await prisma.user.findFirst({
            where: {
                OR: [email, username]
            }
        });

        if (!user_exist) {
            return res.status(404).json({
                message: "User not found !!!"
            });
        }

        const isMatch = await bcrypt.compare(password, user_exist.password);

        const token = jwt.sign({ id: user_exist.id }, process.env.JWT_SECRET);

        return res.status(200).json({
            message: "You are logged in Sucessfully !!!",
            token: token
        });
    }
    catch (error) {
        return res.json({
            message: "Internal Server Error !!!"
        });
    }

});

app.post("/signup", middleware, async (req, res) => {

    const { email, username, password } = req.body();

    const user_exist = await prisma.user.findUnique({
        where: {
            email: email,
            username: username
        }
    });

    if (user_exist) {
        return res.json({
            message: "User already exist !!!"
        });
    }

    const hashed_password = await bcrypt.hash(password, 10);

    const create_user = prisma.user.create({
        data: {
            email: email,
            username: username,
            password: hashed_password
        }
    });

    const token = jwt.sign({ id: create_user.id }, process.env.JWT_SECRET);

    return res.status(200).json({
        message: "User created successfully !!!",
        token: token
    });

});

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});