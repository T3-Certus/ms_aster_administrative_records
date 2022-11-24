import fetch from "node-fetch"
import { config } from "../utils/config"

interface IResponse{
  error: boolean,
  content: any
}

export async function FetchNewAccessToken(refreshToken: string): Promise<IResponse>{
  const url = config.MS_AUTHENTICATION_ADMIN_URL + "/v1/generate-access"
  const body = {"refreshToken": refreshToken}

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    if(!response){
      return {error: true, content: "Invalid request"}
    }
    const res = await response.json()
    console.log(res)
    return {error: false, content: res}

  } catch (error) {
    return {error: true, content: `${error}`}
  }
}