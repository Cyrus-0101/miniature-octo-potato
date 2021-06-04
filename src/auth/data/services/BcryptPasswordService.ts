import bcrypt from "bcrypt";

import IPasswordService from "../../services/IPasswordService";

export default class BcryptPasswordService implements IPasswordService {

    // Salting Hash Rounds Each Users Passwords should go through.
    constructor(private readonly saltRounds: number = 10) {}

    // Hashing Password Function.
    hash(password: string): Promise<string> {
        return bcrypt.hash(password, this.saltRounds);
    }

    // Comparing password to passwordHash.
    compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }

}