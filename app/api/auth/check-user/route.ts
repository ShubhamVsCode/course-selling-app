import User from '@/model/UserModel';
import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db';
import jwt, { JwtPayload } from 'jsonwebtoken';

export async function POST(req: NextRequest) {
    let token = req.cookies.get('token')?.value

    if (!token) {
        const body = await req.json()
        token = body.token
    }

    try {
        if (!token) {
            return NextResponse.json({ message: 'Token not found' }, {
                status: 400
            });
        }

        const decodedToken: string | JwtPayload = jwt.verify(token, process.env.JWT_SECRET!);
        // console.log(decodedToken)

        const { _id, email } = decodedToken as JwtPayload;

        // Connect to DB
        await dbConnect()

        // Check if the email exists in the database
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return NextResponse.json({ message: 'Email not found. Please register first.' }, {
                status: 404
            });
        }

        return NextResponse.json({ message: 'User checked successful', user: existingUser }, {
            status: 200,
        });
    } catch (err) {
        // console.error('Error cheking user:', err);
        return NextResponse.json({ message: 'Internal server error' }, {
            status: 500
        });
    }
}
