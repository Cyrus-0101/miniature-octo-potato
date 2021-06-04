import * as mongoose from 'mongoose'

// Loyalty Points Document.
export interface LoyaltyPointDocument extends mongoose.Document {
  totalPoints: string,
  restaurantId: string,
  userId: string,
  redeemCode: string,
  transactionHistory: string[]
}

// Loyalty Points Model.

export interface LoyaltyPointModel extends mongoose.Model<LoyaltyPointDocument> {}

// Loyalty Points Schema.

const LoyaltyPointSchema = new mongoose.Schema({
  totalPoints: { type: Number, required: true, default: 0 },
  restaurantId: { type: String, required: true },
  userId: { type: String, required: true },
  redeemCode: { type: String },
  // This is the history of all the transactions
  // Points redeemed by the user.
  transactionHistory: { type: [String] },
});


export { LoyaltyPointSchema }
