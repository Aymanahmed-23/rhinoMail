import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
{
name: {
type: String,
required: [true, "User name is required"],
trim: true,
minLength: 2,
maxLength: 30
},
email: {
type: String,
required: [true, "Email is required"],
trim: true,
minLength: 5,
maxLength: 255,
unique: true,
lowercase: true,
match: [/\S+@\S+.\S+/, "Enter valid email address"]
},
password: {
type: String,
required: [true, "Password is required"],
minLength: 5,
maxLength: 20
}
},
{
timestamps: true   
}
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
