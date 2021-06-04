import User from "../../auth/domain/User";

// Here we create the inteface to help in implementing the 
// LoyaltyPointsRepository. 

export default interface ILoyaltyPointsRepository {
    // After signing in users will be met with the
    // loyaltypoints page that will include users info:
    // points, transaction history and redeem code.
    getAllLoyaltyPoints(points: number): Promise<User>;

    getTransactionHistory(page: number, user: string): Promise<Loy
}