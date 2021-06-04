import User from "../../../auth/domain/User";
import ILoyaltyPointsRepository from "../../domain/ILoyaltyPointsRepository";

// Loyalty Points Repository. Document
export default class LoyaltyPointRepository implements ILoyaltyPointsRepository {
    getTransactionHistory(transactionHistory: any) {
        throw new Error("Method not implemented.");
    }
    getAllLoyaltyPoints(points: number): Promise<User> {
        throw new Error("Method not implemented.");
    }
    
}