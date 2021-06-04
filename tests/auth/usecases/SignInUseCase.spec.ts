import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import 'mocha'
import IAuthRepository from '../../../src/auth/domain/IAuthRepository'
import IPasswordService from '../../../src/auth/services/IPasswordService'
import SignInUseCase from '../../../src/auth/usecases/SignInUsecase'
import FakePasswordService from '../helpers/FakePasswordService'
import FakeRepository from '../helpers/FakeRepository'

chai.use(chaiAsPromised)

describe('SignInUseCase', () => {
  let sut: SignInUseCase
  let repository: IAuthRepository
  let passowrdService: IPasswordService

  const user = {
    email: 'john1@doe.com',
    id: '1556',
    name: 'Ren',
    password: '',
    auth_type: 'google',
    }


  beforeEach(() => {
    repository = new FakeRepository()
    passowrdService = new FakePasswordService()
    sut = new SignInUseCase(repository, passowrdService)
  })

  it('Should throw an error when a user is not found.', async () => {
    const user = {
      name: '',
      email: 'wrong@email.com',
      password: '1234',
      auth_type: 'email',
    }

    //assert
    await expect(
      sut.execute(user.name, user.email, user.password, user.auth_type)
    ).to.be.rejectedWith('Invalid email or password')
  })

  it('Should return user ID if email and password is correct.', async () => {
    //act
    const id = await sut.execute(
      user.name,
      user.email,
      user.password,
      user.auth_type
    )
    //assert
    expect(id).to.be.equal(user.id)
  })

  it('Should return user ID if email is correct and type is not email.', async () => {
    //arrange
    const user = {
      email: 'tester@gmail.com',
      id: '1556',
      name: 'Ren',
      password: '',
      type: 'google',
    }

    //act
    const id = await sut.execute(user.name, user.email, '', user.type)
    //assert
    expect(id).to.be.equal(user.id)
  })
})