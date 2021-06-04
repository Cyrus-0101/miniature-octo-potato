export default class User {
    constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly name: string,
        public readonly type: string,
        public readonly password: string,

    ) {}
}