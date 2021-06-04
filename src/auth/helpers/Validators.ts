
import { NextFunction, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'

export const signUpValidationRules = () => {
  return [
    body('name', 'Name is required! Try Again.').notEmpty(),
    body('email', 'Invalid email! Try Again.').notEmpty().isEmail().normalizeEmail(),
    body('auth_type', 'Auth type is required! Try Again.').notEmpty(),
    body('password', 'Password is required (at least 5 characters)! Try Again.')
      .if(body('auth_type').equals('email'))
      .notEmpty()
      .isLength({ min: 5 }),
  ]
}

export const signInValidationRules = () => {
  return [
    body('name', 'Name is required! Try Again.')
      .if(body('auth_type').not().equals('email'))
      .notEmpty(),
    body('email', 'Invalid email! Try Again.').not().isEmpty().isEmail().normalizeEmail(),
    body('auth_type', 'Auth type is required! Try Again.').notEmpty(),
    body('password', 'Password is required (at least 5 characters)! Try Again.')
      .if(body('auth_type').equals('email'))
      .notEmpty()

      .isLength({ min: 5 }),
  ]
}

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors: any = []
  errors
    .array({ onlyFirstError: true })
    .map((err) => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({ errors: extractedErrors })
}