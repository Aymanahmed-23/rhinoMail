import mongoose from "mongoose";

const userSchema = new  mongoose.Schema(
    {
        name: {
            type: String,
            required:[true, ' user name is required'],
            trim: true,
            minLength:2,
            maxLength: 30
        },
        email : {
            type: String,
            required:[true, ' email is required'],
            trim: true,
            minLength:5,
            maxLength: 255,
            unique: true,
            lowercase: true,
            match: [/\S+@\S+\.\S+/, 'Enter valid email address']
        },
        role: {
  type: String,
  enum: ["user", "admin"],
  default: "user"
},
        password: {
            type: String,
            required:[true, ' password is required'],
            
            minLength:5,
            maxLength: 60
        } },
        
{
timestamps: true   
}
);
const User= mongoose.model('User', userSchema);

export default User;