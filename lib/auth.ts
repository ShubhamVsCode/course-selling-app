import { NextRequest } from "next/server"

export const isAuthenticated = async (request: NextRequest) => {
    // console.log("Request cookies", request.cookies.get("token")?.value)

    const res = await fetch(new URL('/api/auth/check-user', request.url), { method: "POST", body: JSON.stringify({ token: request.cookies.get("token")?.value }) }).then((res) => {
        console.log(res.status)
        return res.ok
    }).catch(err => {
        console.log(err)
        return null
    })

    return res
} 