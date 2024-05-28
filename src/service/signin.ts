import { Http } from "@/app/config/axiosConfig"
import { ISigninCredentials } from "@/types/ISigninCredentialsDTO"
import { ISigninData } from "@/types/ISigninDataDTO"

export const signin = {

    async handleLogin(credentials: ISigninCredentials): Promise<any> {
        const { name, password } = credentials
  
        if (!name || !password) return

        const data = {
            name,
            password
        }
        const options = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        return await Http.post<ISigninData | any>("/login", data, options).then(res => res.data).catch(e => e)
    },
}