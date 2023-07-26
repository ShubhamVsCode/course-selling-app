import User from '@/model/UserModel';
import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/db';
import { cookies } from 'next/headers';
import { generateJWTToken, verifyPassword } from '../utils/userUtils';

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { email, password }: { email: string; password: string } = body

    try {
        // Checking if all required fields are present
        if (!email || !password) {
            return NextResponse.json({ message: 'Please provide all required fields: email, password' }, {
                status: 400
            });
        }

        // Connect to DB
        await dbConnect()

        // Check if the email exists in the database
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return NextResponse.json({ message: 'Email not found. Please register first.' }, {
                status: 404
            });
        }

        // Check if the provided password matches the stored hashed password
        const isPasswordValid = verifyPassword(password, existingUser.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: 'Invalid email or password' }, {
                status: 401
            });
        }

        // If login is successful, generate a JWT token
        const token = generateJWTToken(existingUser._id, email);

        // Set the token as a cookie
        cookies().set('token', token, { secure: true });

        return NextResponse.json({ message: 'Login successful', user: existingUser }, {
            status: 200,
        });
    } catch (err) {
        console.error('Error logging in user:', err);
        return NextResponse.json({ message: 'Internal server error' }, {
            status: 500
        });
    }
}
