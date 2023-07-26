import User from '@/model/UserModel';
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from "bcryptjs"
import dbConnect from '@/lib/db';
import { cookies } from 'next/headers';
import { generateJWTToken } from '../utils/userUtils';

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { email, password, firstName, lastName }: IUser = body

    try {
        // Checking if all required fields are present
        if (!email || !password || !firstName) {
            return NextResponse.json({ message: 'Please provide all required fields: firstName, email, password' }, {
                status: 400
            });
        }
        // Connect to DB
        await dbConnect()

        // Checking if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: 'Email is already registered' }, {
                status: 409
            });
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(password, 10);

        // Create a new user
        const newUser = await User.create({
            firstName,
            lastName,
            password: hashedPassword,
            email,
        });

        const token = generateJWTToken(newUser._id, email)

        cookies().set('token', token, { secure: true })

        return NextResponse.json({ message: 'User registered successfully', user: newUser }, {
            status: 201,
        })
    } catch (err) {
        console.error('Error registering user:', err);
        return NextResponse.json({ message: 'Internal server error' }, {
            status: 500
        });
    }
}

