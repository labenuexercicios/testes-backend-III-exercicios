import { UserBusiness } from "../../../src/business/UserBusiness"
import { LoginSchema } from "../../../src/dtos/user/login.dto"
import { BadRequestError } from "../../../src/errors/BadRequestError"
import { NotFoundError } from "../../../src/errors/NotFoundError"
import { HashManagerMock } from "../../mocks/HashManagerMock"
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../../mocks/UserDatabaseMock"
import { BaseDatabase } from "../../../src/database/BaseDatabase";

describe("Testando login", () => {
  const userBusiness = new UserBusiness(
    new UserDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock(),
    new HashManagerMock()
  )

  test("deve gerar token ao logar", async () => {
    const input = LoginSchema.parse({
      email: "fulano@email.com",
      password: "fulano123"
    })

    const output = await userBusiness.login(input)

    expect(output).toEqual({
      message: "Login realizado com sucesso",
      token: "token-mock-fulano"
    })
  })

  test("deve verificar se o email está correto", async () => {
    expect.assertions(1)
    try {
      const input = LoginSchema.parse({
      email: "email-invalido@email.com",
      password: "fulano123"
    })
      const output = await userBusiness.login(input)

    } catch (error) {
      if (error instanceof NotFoundError)
      expect(error.message).toEqual("'email' não encontrado")
    }
  })

  test("deve verificar se o password está correto", async () => {
    expect.assertions(1)
    try {
      const input = LoginSchema.parse({
      email: "fulano@email.com",
      password: "senha-errada123"
    })
      const output = await userBusiness.login(input)

    } catch (error) {
      if (error instanceof BadRequestError)
      expect(error.message).toEqual("'email' ou 'password' incorretos")
    }
  })
})

