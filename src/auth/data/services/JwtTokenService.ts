import jwt from 'jsonwebtoken';

import ITokenService from "../../services/ITokenService";

export default class JwtTokenService implements ITokenService {

    constructor(
        private readonly privateKey: string
    ) {}

    // Token Encoding sent to the Front End.
    encode(payload: string | object): string | object {

        let token = jwt.sign({ data: payload }, this.privateKey, {
            issuer: 'com.mbuzimunchapp',
            expiresIn: '1y',
            algorithm: 'HS256'
        });

        return token;
    }

    // Token Decoded Everytime a request is sent to the Server.
    decode(token: string): string | object {
        try {
            const decoded = jwt.verify(token, this.privateKey);

            return decoded;
            
        } catch (error) {
            return '';
        };
    }

}