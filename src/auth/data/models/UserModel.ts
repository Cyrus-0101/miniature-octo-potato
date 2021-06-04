import { Document, Schema} from 'mongoose';

export interface UserModel extends Document {
    type: string,
    name: string,
    email: string,
    password?: string
}

export const UserSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    name: String,
    email: {
        type: String,
        required: true
    },
    password: String,

    // One record can store only 16MB.
    
    purchase: {
        type: Number
    },

    purchase_date: {
        type: Date
    }

});