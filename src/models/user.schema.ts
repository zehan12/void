import { Model, model, Schema } from "mongoose";

export interface IUser extends Document {
    name: string;
    username: string;
    email: string;
    password?: string;
    profilePicture: string;
    following: [];
    followers: [];
    bio: string;
    isFrozen: boolean;
}

// use for define type for statics method
interface UserModel extends Model<IUser> {}

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

export const User = model<IUser, UserModel>("User", userSchema);
