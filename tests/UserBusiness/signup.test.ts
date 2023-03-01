import { UserBusiness } from "../../src/business/UserBusiness"
import { SignupInputDTO } from "../../src/dtos/userDTO"
import { BadRequestError } from "../../src/errors/BadRequestError"
import { HashManagerMock } from "../mocks/HashManagerMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../mocks/UserDatabaseMock"

describe("signup", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new HashManagerMock()
    )
    
    test("cadastro bem-sucedido retorna token", async () => {
        const input: SignupInputDTO = {
            email: "example@email.com",
            name: "Example Mock",
            password: "bananinha"
        }

        const response = await userBusiness.signup(input)
        expect(response.token).toBe("token-mock-normal")
    })

//Teste com assertions (try/catch)
    test ("Testar erro de formato no signup 'name'",async () => {
        expect.assertions(2);

        const input: SignupInputDTO = {
            email: "normal@email.com",
            name: 2578,
            password: "bananinha"
        } 

        try{
            await userBusiness.signup(input);
        }catch(error){
            if(error instanceof BadRequestError){
                expect(error.message).toBe("'name' deve ser string")
                expect(error.statusCode).toBe(400)
            }
        }
    })


    test ("Testar erro de formato no signup 'email'",async () => {
        expect.assertions(2);

        const input: SignupInputDTO = {
            email: true,
            name: "Normal Mock",
            password: "bananinha"
        } 

        try{
            await userBusiness.signup(input);
        }catch(error){
            if(error instanceof BadRequestError){
                expect(error.message).toBe("'email' deve ser string")
                expect(error.statusCode).toBe(400)
            }
        }
    })

    test ("Testar erro de formato no signup 'password'",async () => {
        expect.assertions(2);

        const input: SignupInputDTO = {
            email: "normal@email.com",
            name: "Normal Mock",
            password: 859
        } 

        try{
            await userBusiness.signup(input);
        }catch(error){
            if(error instanceof BadRequestError){
                expect(error.message).toBe("'password' deve ser string")
                expect(error.statusCode).toBe(400)
            }
        }
    })


//Teste com toThrow (sem try / catch)
    test ("Testar erro 'email' já cadastrado",async () => {
        const input: SignupInputDTO = {
            email: "admin@email.com",
            name: "Example Mock",
            password: "bananinha"
        } 

        expect(async ()=>{
            await userBusiness.signup(input)
        }).rejects.toThrow("'email' já existe")
    })
})