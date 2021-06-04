import IAuthRepository from '../../../src/auth/domain/IAuthRepository'
import User from '../../../src/auth/domain/User'

export default class FakeRepository implements IAuthRepository {
  public users = [
    {
      email: 'baller@gg.com',
      id: '1234',
      name: 'Baller',
      type: 'email',
      password: '$2b$10$K0HEqyYUlQLaj.Xkp9tDzuRclzJqdKCYV7gEHtSVIlu8NRtLM6flC'
    },
    {
      email: 'john@doe.com',
      id: '607332332d72d8ee72ef8765',
      name: 'Ken',
      password: 'pass123',
      type: 'email'
    },
    {
      email: 'tester@gmail.com',
      id: '1556',
      name: 'Ren',
      password: '',
      type: 'google',
    },
    {
      email: 'john1@doe.com',
      id: '1556',
      name: 'Ren',
      type: 'google',
      password: ''
    },
  ]

  public async find(email: string): Promise<User> {
    const user = this.users.find((x) => x.email === email)

    if (!user) return Promise.reject('User not found')

    return new User(
      user?.id,
      user?.name,
      user?.email,
      user?.type,
      user?.password,
    )
  }

  public async add(
    name: string,
    email: string,
    password: string,
    type: string
  ): Promise<string> {
    const max = 9999
    const min = 1000
    const id = (Math.floor(Math.random() * (+max - +min)) + +min).toString()

    this.users.push({
      email: email,
      id: id,
      name: name,
      type: type,
      password: password
    });
    return id;
  }
}