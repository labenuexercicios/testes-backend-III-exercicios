import { BaseDatabase } from "../../src/database/BaseDatabase"
import { UserDB, USER_ROLES } from "../../src/types"

export class UserDatabaseMock extends BaseDatabase {
    public static TABLE_USERS = "users"

    public insert = async (userDB: UserDB): Promise<void> => {
        // não precisa retornar nada, porque é void
    }

    public findByEmail = async (email: string): Promise<UserDB | undefined>  => {
        switch (email) {
            case "normal@email.com":
                return {
                    id: "id-mock",
                    name: "Normal Mock",
                    email: "normal@email.com",
                    password: "hash-bananinha",
                    created_at: new Date().toISOString(),
                    role: USER_ROLES.NORMAL
                }
            case "admin@email.com":
                return {
                    id: "id-mock",
                    name: "Admin Mock",
                    email: "admin@email.com",
                    password: "hash-bananinha",
                    created_at: new Date().toISOString(),
                    role: USER_ROLES.ADMIN
                }
            default:
                return undefined
        }
    }

    public getAll = async (): Promise<UserDB[]>  => {
        return [
            {
                id: "id-mock",
                name: "Normal Mock",
                email: "normal@email.com",
                password: "hash-bananinha",
                created_at: new Date().toISOString(),
                role: USER_ROLES.NORMAL
            },
            {
                id: "id-mock",
                name: "Admin Mock",
                email: "admin@email.com",
                password: "hash-bananinha",
                created_at: new Date().toISOString(),
                role: USER_ROLES.ADMIN
            }
        ]
    }

    public findById = async (id: string): Promise<UserDB | undefined>  => {
        switch (id) {
            case "id-mock-normal":
                return {
                    id: "id-mock-normal",
                    name: "Normal Mock",
                    email: "normal@email.com",
                    password: "hash-bananinha",
                    created_at: new Date().toISOString(),
                    role: USER_ROLES.NORMAL
                }
            case "id-mock-admin":
                return {
                    id: "id-mock-admin",
                    name: "Admin Mock",
                    email: "admin@email.com",
                    password: "hash-bananinha",
                    created_at: new Date().toISOString(),
                    role: USER_ROLES.ADMIN
                }
            default:
                return undefined
        }
    }

    public deleteById = async (id: string): Promise<void>  => {}
}