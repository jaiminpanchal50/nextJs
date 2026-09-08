
import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

export async function getCurrentUser() {
    // for getting current user we have to read the users cookie so we use cookies from the next/headers
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    if(!token) throw new Error("Token not found")

    const decodedToken = verifyToken(token)

    if(!decodedToken) throw new Error("Unauthorized")


    return decodedToken.userId
    
}