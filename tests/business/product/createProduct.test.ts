import { ProductBusiness } from "../../../src/business/ProductBusiness";
import { CreateProductInputDTO, CreateProductSchema } from "../../../src/dtos/product/createProduct.dto";
import { BadRequestError } from "../../../src/errors/BadRequestError";
import { IdGeneratorMock } from "../../mocks/IdGeneratorMock";
import { ProductDatabaseMock } from "../../mocks/ProductDatabaseMock";
import { TokenManagerMock } from "../../mocks/TokenManagerMock";

describe("Testando createProduct", () => {
    const productBusiness = new ProductBusiness(
      new ProductDatabaseMock(),
      new IdGeneratorMock(),
      new TokenManagerMock()
    );
  
    test("Deve criar um novo produto", async () => {
      const input = CreateProductSchema.parse({
        // id: "id-mock",
        name: "Bananinha",
        price: 9,
        token: "token-mock-astrodev"
      });
  
      const output = await productBusiness.createProduct(input);
  
      expect(output).toEqual({
        message: "Produto cadastrado com sucesso",
        product: {
          createdAt: expect.any(String),
          id: "id-mock",
          name: "Bananinha",
          price: 9,
        },
      });
    });

    test("deve retornar erro se o token for inválido", async () => {
      expect.assertions(1)
      try {
        const input = CreateProductSchema.parse({
          // id: "id-mock",
          name: "Bananinha",
          price: 9,
          token: "token-inválido"
        });
        const output = await productBusiness.createProduct(input)
      } catch (error) {
        if (error instanceof BadRequestError){
          expect(error.message).toBe("token inválido")
        }
      }
    })
    test("somente admins podem criar produtos", async () => {
      expect.assertions(1)
      try {
        const input = CreateProductSchema.parse({
          // id: "id-mock",
          name: "Bananinha",
          price: 9,
          token: "token-mock-fulano"
        });
        const output = await productBusiness.createProduct(input)
      } catch (error) {
        if (error instanceof BadRequestError){
          expect(error.message).toBe("somente admins podem acessar")
        }
      }
    })
  });
  