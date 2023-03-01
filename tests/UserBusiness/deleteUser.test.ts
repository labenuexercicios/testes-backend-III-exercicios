import { UserBusiness } from "../../src/business/UserBusiness"
import { HashManagerMock } from "../mocks/HashManagerMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../mocks/UserDatabaseMock"
import { DeleteUserInputDTO } from "../../src/dtos/userDTO"
import { BadRequestError } from "../../src/errors/BadRequestError"

describe("deleteUser", () => {
    const userBusiness = new UserBusiness(
      new UserDatabaseMock(),
      new IdGeneratorMock(),
      new TokenManagerMock(),
      new HashManagerMock()
    )
  
    test("Deve deletar um usuário a partir do(id)", async () => {
      const input: DeleteUserInputDTO = {
        idToDelete: "id-mock-normal",
        token: "token-mock-admin",
      }
  
      const response = await userBusiness.deleteUser(input)
      // expect(response.message).toBe("USER DELETED SUCCESSFULLY")
      expect(response).toEqual({ message: "USER DELETED SUCCESSFULLY" })
    })
  
    test ("Testar erro de formato no token",async () => {
        expect.assertions(1);

        const input: DeleteUserInputDTO = {
            idToDelete: "id-mock-normal",
            token: true,
          }

        try{
            await userBusiness.deleteUser(input);
        }catch(error){
            if(error instanceof BadRequestError){
                expect(error.message).toBe("requer token")
            }
        }
    })


//Teste com toThrow (sem try / catch)
    test ("Testar input de token inexistente",async () => {
        const input: DeleteUserInputDTO = {
            idToDelete: "id-mock-normal",
            token: "newtoken-mock-admin",
          }

        expect(async ()=>{
            await userBusiness.deleteUser(input)
        }).rejects.toThrow("token inválido")
    })

    test ("Testar regra de 'role' para excluir users",async () => {
        const input: DeleteUserInputDTO = {
            idToDelete: "id-mock-normal",
            token: "token-mock-normal",
          }

        expect(async ()=>{
            await userBusiness.deleteUser(input)
        }).rejects.toThrow("somente admins podem deletar contas")
    })

    test ("Testar se o 'id' existe",async () => {
        const input: DeleteUserInputDTO = {
            idToDelete: "newid-mock-normal",
            token: "token-mock-admin",
          }

        expect(async ()=>{
            await userBusiness.deleteUser(input)
        }).rejects.toThrow("'id' não existe")
    })
})
  