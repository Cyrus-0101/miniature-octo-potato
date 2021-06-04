export class LoyaltyPoint {
    constructor(
      public readonly id: string,
      public readonly restaurantId: string,
      public readonly userId: string,
      public readonly redeemCode: string,
    ) {}
}