import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
    name: { type: String , required: true },
    email: { type: String , required: true, unique: true },
    password: { type: String },
    active: { type: Boolean , default: false },
    isAdmin: { type: Boolean , default: false },
    firstLogin: { type: Boolean , default: true },
    googleImage: { type: String , default: undefined },
    googleId: { type: String , default: undefined },
    
}, { timestamps : true });

UserSchema.methods.matchPasswords = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.pre("save", async function (next){
    if(!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', UserSchema);
export default User;