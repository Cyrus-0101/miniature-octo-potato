import { Request, Response, NextFunction } from 'express'

// Our custom logger.
const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    let time = new Date().toLocaleTimeString("en-US").split(/:| /);
    console.log('[TIME]:' + time + ', :[ REQUEST METHOD: ]: ', req.method + ', [REQUEST PATH]: ', req.path + ' ,[RESPONSE MESSAGE]: ', res + '\n');
    next();
}

export default loggerMiddleware;