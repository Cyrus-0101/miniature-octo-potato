import { Router, Response, Request, NextFunction } from 'express';

import IAuthRepository from '../domain/IAuthRepository';
import TokenValidator from '../helpers/TokenValidator';
import { signInValidationRules, signUpValidationRules } from '../helpers/Validators';
import { validate } from '../helpers/Validators';
import IPasswordService from '../services/IPasswordService';
import ITokenService from '../services/ITokenService';
import ITokenStore from '../services/ITokenStore';
import SignInUseCase from '../usecases/SignInUsecase';
import SignOutUseCase from '../usecases/SignOutUseCase';
import SignUpUseCase from '../usecases/SignUpUseCase';
import AuthController from './AuthController';

export default class AuthRouter {
    public static configure(
        authRepository: IAuthRepository,
        tokenService: ITokenService,
        tokenStore: ITokenStore,
        passwordService: IPasswordService,
        tokenValidator: TokenValidator
    ): Router {

        const router = Router();

        let controller = AuthRouter.composeController(
            authRepository, tokenService, tokenStore, passwordService
        );

        // Sign In Route
        router.post(
            '/signin',
            signInValidationRules(), 
            validate, 
            (req: Request, res: Response) => {
                controller.signInController(req, res)
            }
        );

        // Sign Up Route
        router.post(
            '/signup',
            signUpValidationRules(),
            validate, 
            (req: Request, res: Response) => {
                controller.signUpController(req, res)
            }
        );

        // Sign Up Route
        router.post(
            '/signout',
            (req, res, next) => tokenValidator.validate(req, res, next),
            (req: Request, res: Response) => {
                controller.signOutController(req, res)
            }
        );

        return router;
    }

    private static composeController(
        authRepository: IAuthRepository,
        tokenService: ITokenService,
        tokenStore: ITokenStore,
        passwordService: IPasswordService,
    ): AuthController {
        const signinUseCase = new SignInUseCase(authRepository, passwordService);
        const signUpUseCase = new SignUpUseCase(authRepository, passwordService);
        const signOutUseCase = new SignOutUseCase(tokenStore)
        const controller = new AuthController(
            signinUseCase,
            signUpUseCase,
            signOutUseCase,
            tokenService
        );
        return controller;
    }
}