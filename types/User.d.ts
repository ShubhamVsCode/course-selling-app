
interface SocialMediaLinks {
    website?: string;
    twitter?: string;
    linkedin?: string;
    github?: string;
}

interface IUser extends Document {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
    avatar?: string;
    bio?: string;
    country?: string;
    socialMedia?: SocialMediaLinks;
    role: 'user' | 'instructor' | 'admin';
    isVerified: boolean;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
}

interface IUserWithMethods extends Document {
    // verifyPassword: (string) => boolean;
    // generateJWTToken: (string, string) => string;
    // decodeToken: (string) => { _id: string, email: string } | undefined;
}

interface User {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
    avatar?: string;
    bio?: string;
    country?: string;
    socialMedia?: SocialMediaLinks;
    role: 'user' | 'instructor' | 'admin';
    isVerified: boolean;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
}