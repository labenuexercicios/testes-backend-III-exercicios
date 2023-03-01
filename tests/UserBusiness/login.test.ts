import { UserBusiness } from "../../src/business/UserBusiness"
import { LoginInputDTO } from "../../src/dtos/userDTO"
import { BadRequestError } from "../../src/errors/BadRequestError"
import { HashManagerMock } from "../mocks/HashManagerMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../mocks/UserDatabaseMock"

describe("login", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new HashManagerMock()
    )
    
    test("login bem-sucedido em conta normal retorna token", async () => {
        const input: LoginInputDTO = {
            email: "normal@email.com",
            password: "bananinha"
        }

        const response = await userBusiness.login(input)
        expect(response.token).toBe("token-mock-normal")
    })

    test("login bem-sucedido em conta admin retorna token", async () => {
        const input: LoginInputDTO = {
            email: "admin@email.com",
            password: "bananinha"
        }

        const response = await userBusiness.login(input)
        expect(response.token).toBe("token-mock-admin")
    })

    test ("Testar erro de formato no signup 'email'",async () => {
        expect.assertions(2);

        const input: LoginInputDTO = {
            email: 539,
            password: "bananinha"
        }

        try{
            await userBusiness.login(input);
        }catch(error){
            if(error instanceof BadRequestError){
                expect(error.message).toBe("'email' deve ser string")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test ("Testar erro de formato no signup 'password'",async () => {
        expect.assertions(2);

        const input: LoginInputDTO = {
            email: "normal@email.com",
            password: false
        }

        try{
            await userBusiness.login(input);
        }catch(error){
            if(error instanceof BadRequestError){
                expect(error.message).toBe("'password' deve ser string")
                expect(error.statusCode).toBe(400)
            }
        }
    })


//Teste com toThrow (sem try / catch)
    test ("Testar erro 'email' não cadastrado",async () => {
        const input: LoginInputDTO = {
            email: "newemail@email.com",
            password: "bananinha"
        }

        expect(async ()=>{
            await userBusiness.login(input)
        }).rejects.toThrow("'email' não cadastrado")
    })

    test ("Testar erro 'password' incorreta",async () => {
        const input: LoginInputDTO = {
            email: "normal@email.com",
            password: "bolinha"
        }

        expect(async ()=>{
            await userBusiness.login(input)
        }).rejects.toThrow("'password' incorreto")
    })
})