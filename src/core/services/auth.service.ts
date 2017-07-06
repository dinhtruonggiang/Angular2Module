import { Injectable } from '@angular/core';

@Injectable()

export class AuthService {

    private USER_INFO = 'user_info';

    public setUser<T>(user: T): void {
        localStorage[this.USER_INFO] = JSON.stringify(user);
    };

    public getUser<T>(): T | any {
        return JSON.parse(localStorage[this.USER_INFO]);
    }

    public getToken<T>(tokenProp?: string): string {
        const user = this.getUser<T>();
        if (user) return user[tokenProp] || user.token;
    }
};
