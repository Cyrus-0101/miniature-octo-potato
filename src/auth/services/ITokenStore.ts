export default interface ITokenStore {
    // We will use Redis to validate and blacklist the signedIn User token.
    // This means users can sign out.
    // We will be checking whether users are using correct tokens with this interface
    save(token: string): void

    get(token: string): Promise<string>
}