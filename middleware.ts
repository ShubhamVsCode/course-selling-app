import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isAuthenticated } from './lib/auth'

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value
    if (!token) {
        console.log("Redirecting...")
        if (request.url.includes('/login') || request.url.includes('/register')) {
            return NextResponse.next()
        }
        return NextResponse.redirect(new URL('/login', request.url))
    }

    const res = await isAuthenticated(request)
    console.log(res ? "Authenticated" : "Not Authenticated", request.url)

    if (!res) {
        if (request.url.includes('/login') || request.url.includes('/register')) {
            return NextResponse.next()
        }
        return NextResponse.redirect(new URL('/login', request.url))
    } else {
        if (request.url.includes('/login') || request.url.includes('/register')) {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/', "/login", "/register"],
}