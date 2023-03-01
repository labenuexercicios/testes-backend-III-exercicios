import { UserBusiness } from "../../src/business/UserBusiness"
import { GetByIdInputDTO } from "../../src/dtos/userDTO"
import { USER_ROLES } from "../../src/types"
import { HashManagerMock } from "../mocks/HashManagerMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../mocks/UserDatabaseMock"

describe("getUserById", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new HashManagerMock()
    )

    test("Deve retornar um Usuário a partir do (id)", async () => {
        const input: GetByIdInputDTO = {
          idToFind: "id-mock-normal"
        }
    
        const response = await userBusiness.getById(input)
        expect(response).toEqual({
            id: "id-mock-normal",
            name: "Normal Mock",
            email: "normal@email.com",
            password: "hash-bananinha",
            createdAt: expect.any(String), // valor dinâmico (pode ser qualquer string)
            role: USER_ROLES.NORMAL
        })
      })
    })

// test ("Testar se o 'id' existe",async () => {
//     const input: DeleteUserInputDTO = {
//         idToDelete: "newid-mock-normal",
//         token: "token-mock-admin",
//       }

//     expect(async ()=>{
//         await userBusiness.deleteUser(input)
//     }).rejects.toThrow("'id' não existe")
// })