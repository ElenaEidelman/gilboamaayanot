export class User{
    id: number;
    constructor(private login: string, private password: string){
        this.login = login;
        this.password = password;
    }
}