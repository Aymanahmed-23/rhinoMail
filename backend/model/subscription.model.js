import mongoose from "mongoose";

const subSchema = new  mongoose.Schema(
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
            unique: true,
            lowercase: true,
            match: [/\S+@\S+\.\S+/, 'Enter valid email address']
        },  
        isVerified: {
            type: Boolean,
            default: false
        },
        verificationToken: {
            type:String
        },
        unSubscribe: {
            type: Boolean
        }},
{
timestamps: true   
}
);
const Subscription= mongoose.model('Subscription', subSchema);

export default Admin;