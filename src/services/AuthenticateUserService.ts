import {getRepository} from 'typeorm';
import {compare} from 'bcryptjs';
import {sign} from 'jsonwebtoken';

import User from "../models/User";

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

export default class AuthenticateUserService {
    public async execute ({email, password}: Request): Promise<Response> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({where: {email}});

        if (!user) {
            throw new Error("Incorrect email and/or password!");
        }

        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched){
            throw new Error("Incorrect email and/or password!");
        }

        const token = sign({ }, 'a4f7ae41de21f6be44f9d147fa41d2f5', {
            subject: user.id,
            expiresIn: '1d',
        });

        return {user, token};
    }
}