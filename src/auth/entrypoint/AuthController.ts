import * as express from "express";
import ITokenService from "../services/ITokenService";
import SignInUseCase from "../usecases/SignInUsecase";
import SignOutUseCase from "../usecases/SignOutUseCase";
import SignUpUseCase from "../usecases/SignUpUseCase";

export default class AuthController {
    private readonly signInUseCase: SignInUseCase;
    private readonly signUpUseCase: SignUpUseCase;
    private readonly signOutUseCase: SignOutUseCase;
    private readonly tokenService: ITokenService;

    constructor(
        signInUseCase: SignInUseCase,
        signupUseCase: SignUpUseCase,
        signoutUseCase: SignOutUseCase,
        tokenService: ITokenService
    ) {
        this.signInUseCase = signInUseCase;
        this.tokenService = tokenService;
        this.signUpUseCase = signupUseCase;
        this.signOutUseCase = signoutUseCase;
    }

    /**
     * signInController
    */
   
    public async signInController(req: express.Request, res: express.Response) {
        try {
            const { name, email, password, auth_type } = req.body;
            return this.signInUseCase
                .execute(name, email, password, auth_type)
                .then((id: string) =>
                    res.status(200).json({ auth_token: this.tokenService.encode(id) })
                )
                .catch((err: Error) => res.status(404).json({ error: err }));
        } catch (err) {
            return res.status(400).json({ error: err });
        }
    }

    /**
     * signUpController
    */

    public async signUpController(req: express.Request, res: express.Response) {
        try {
            const { name, email, password, auth_type } = req.body;
            return this.signUpUseCase
                .execute(name, auth_type, email, password)
                .then((id: string) =>
                    res.status(200).json({ auth_token: this.tokenService.encode(id) })
                )
                .catch((err: Error) => res.status(404).json({ error: err }));
        } catch (err) {
            return res.status(400).json({ error: err });
        }
    }

    /**
     * signOutController
    */

    public async signOutController(req: express.Request, res: express.Response) {
        try {
            const token = req.headers.authorization!;
            return this.signOutUseCase
                .execute(token)
                .then((result) => res.status(200).json({ message: result }))
                .catch((err: Error) => res.status(404).json({ error: err }));
        } catch (err) {
            return res.status(400).json({ error: err });
        }
    }
}
