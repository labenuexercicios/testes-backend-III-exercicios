import { ProductBusiness } from '../../../src/business/ProductBusiness'
import { GetProductsInputDTO, GetProductsSchema } from '../../../src/dtos/product/getProducts.dto'
import { BadRequestError } from '../../../src/errors/BadRequestError'
import { BaseError } from '../../../src/errors/BaseError'
import { IdGeneratorMock } from '../../mocks/IdGeneratorMock'
import { ProductDatabaseMock } from '../../mocks/ProductDatabaseMock'
import { TokenManagerMock } from '../../mocks/TokenManagerMock'

describe("Testando getProducts", () => {
  const productBusiness = 
    new ProductBusiness(
    new ProductDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  )

  test("deve retornar uma lista de produtos", async () => {
    // const input = GetProductsSchema.parse({
    //   token: "token-mock-astrodev"
    // })
    // teste com zod 

    const input: GetProductsInputDTO = {token: "token-mock-astrodev", q: ""}
    const output = await productBusiness.getProducts(input)

    expect(output).toHaveLength(2)
    expect(output).toEqual([
      {
        id: 'p001',
        name: 'Mouse',
        price: 50,
        createdAt: expect.any(String)
      },
      {
        id: 'p002',
        name: 'Teclado',
        price: 80,
        createdAt: expect.any(String)
      }
    ])
  })

  test("deve retornar erro se o token for inválido", async () => {
    expect.assertions(1)
    try {
      const input: GetProductsInputDTO = {token: "token-inválido", q: ""}
      const output = await productBusiness.getProducts(input)
    } catch (error) {
      if (error instanceof BadRequestError){
        expect(error.message).toBe("token inválido")
      }
    }
  })

})