import { Model, model, Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
    name: string;
    username: string;
    email: string;
    password?: string;
    profilePicture?: string;
    following?: [];
    followers?: [];
    bio?: string;
    isFrozen?: boolean;
    verifyPassword: (password: string) => boolean;
}

// use for define type for statics method
interface UserModel extends Model<IUser> {
    isEmailTaken: (email: string) => boolean;
    isUsernameAvailable: (username: string) => boolean;
}

const userSchema = new Schema<IUser, UserModel>(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            minLength: 6,
            required: true,
        },
        profilePicture: {
            type: String,
            default: "",
        },
        followers: {
            type: [String],
            default: [],
        },
        following: {
            type: [String],
            default: [],
        },
        bio: {
            type: String,
            default: "",
        },
        isFrozen: {
            type: Boolean,
            default: false,
        },
    },
    {
        toJSON: {
            transform(doc, ret) {
                delete ret.password;
                delete ret.__v;
                delete ret.createdAt;
                delete ret.updatedAt;
            },
        },
        timestamps: true,
    }
);

userSchema.index({ username: 1, email: 1 }, { unique: true });

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
};

userSchema.statics.isUsernameAvailable = async function (
    username,
    excludeUserId
) {
    const user = await this.findOne({ username, _id: { $ne: excludeUserId } });
    return !user;
};

// storing hashed password in db
// @ts-ignore
userSchema.pre("save", async function (next: NextFunction) {
    if (this.password && this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// login flow check password
// @ts-ignore
userSchema.methods.verifyPassword = async function (
    password: string
): Promise<boolean> {
    try {
        // @ts-ignore
        var result = await bcrypt.compare(password, this.password);
        return result;
    } catch (error) {
        return false;
    }
};

export const User = model<IUser, UserModel>("User", userSchema);
