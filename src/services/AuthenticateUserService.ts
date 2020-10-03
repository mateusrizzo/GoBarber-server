import {getRepository} from 'typeorm';
import {compare} from 'bcryptjs';

import User from "../models/User";

interface Request {
    email: string;
    password: string;
}

export default class AuthenticateUserService {
    public async execute ({email, password}: Request): Promise<{user: User}> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({where: email});

        if (!user) {
            throw new Error('Incorrect email and/or password!');
        }

        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched){
            throw new Error('Incorrect email and/or password!');
        }

        return {user};
    }
}