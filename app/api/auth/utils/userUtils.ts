import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
export function generateJWTToken(_id: string, email: string) {
    return jwt.sign({ _id, email }, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_EXPIRES_IN || "2d"
    });
}
export function verifyPassword(password: string, savedHash: string) {
    return bcrypt.compareSync(password, savedHash);
}

export function decodeToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET!);
}