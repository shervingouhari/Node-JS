import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: { type: String, require: true, unique: true },
        password: { type: String, require: true },
        isAdmin: { type: Boolean, default: false },
    },
    { timestamps: true }
);

userSchema.methods.show = function () {
    return this.toObject({
        transform: (doc, ret) => {
            delete ret.password;
        },
    });
};

export default mongoose.model("User", userSchema);
