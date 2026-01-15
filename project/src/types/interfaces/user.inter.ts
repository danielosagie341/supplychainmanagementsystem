import mongoose, { Document, Schema } from "mongoose";


export interface IUser extends Document {
    fullname: string;
    email: string;
    userType: string;
    password: string;
    emailVerification: {
        token: string;
        expiresAt: Date;
    };
}

interface IOtp {
    code: number | null;
    expiresAt: Date | null;
}


export interface Iuser extends Document{
    firstname: string;
    lastname: string;
    gender: string;
    email: string;
    password: string;
    image?: string | '';
    passwordConfirm: string;
    userType: 'admin' | 'supplier' | 'distributor' | 'consumer';
    organization: string;
    isActive: boolean;
    onlineStatus: boolean;
    verificationToken: string;
    verificationTokenExpires: Date;
    otp: IOtp;
    resetPasswordToken: number;
    resetPasswordExpire: Date;
    verifyEmailToken: string;
    product: mongoose.Types.ObjectId[];
    order: mongoose.Types.ObjectId[];
    inventory: mongoose.Types.ObjectId[];
    correctPassword(candidatePassword: string, userPassword: string): Promise<boolean>;
    generateAuthToken(): string;
    changedPasswordAfter(JWTTimestamp: any): boolean;
    createdAt: Date;
}
