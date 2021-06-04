import { Mongoose } from "mongoose";

import IAuthRepository from "../../domain/IAuthRepository";
import User from "../../domain/User";
import { UserModel, UserSchema } from "../models/UserModel";

export default class AuthRepository implements IAuthRepository {

    constructor(private readonly client: Mongoose) {}

    // Finding a User.
    public async find(email: string): Promise<User> {
        const users = this.client.model<UserModel>('User', UserSchema);

        const user = await users.findOne({email: email.toLowerCase() });

        if(!user) return Promise.reject('User Not Found.');

        return new User(
            user.id,
            user.name,
            user.email,
            user.type,
            user.password ?? ''
        );
    }

    //  Add a User
    public async add(
        name: string,
        email: string,
        type: string,
        passwordHash?: string
    ): Promise<string> {

        const userModel = this.client.model<UserModel>('User', UserSchema);

        const savedUser = new userModel({
            type: type,
            name: name,
            email: email.toLowerCase(),
        });

        if(passwordHash) savedUser.password = passwordHash;

        await savedUser.save();

        return savedUser.id
    }

}