import { LocalStorage } from './localStorage';
import { Common } from './common';
declare var __Module;

export class AuthHelper {
    public static resetLocalStorage() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('access_expire');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('userProfile');
        localStorage.removeItem('user_permissions');
        localStorage.removeItem('user_access_pages');
        localStorage.removeItem('token');
    }

    public static setupAuthorizeLocalStorage(profile) {
        if (profile) {
            localStorage.setItem('access_token', profile['access_token']);
            localStorage.setItem('access_expire', profile['.expires']);
            localStorage.setItem('refresh_token', profile['refresh_token']);
            localStorage.setItem('userProfile', profile['userProfile']);
            localStorage.setItem('token', JSON.stringify(profile));
            __Module.undoDropDownList();
        }
    }

    public static jQueryAjaxSetup() {
        // We setup here for jQuery ajax
        $(document).ajaxError(function (event, request, settings) {
            console.log(request);
            if (request.status === 401 && request.statusText === 'Unauthorized') {
                window.location.href = '/login';
                console.log('go to login');
            }
        });

        $.ajaxSetup({
            beforeSend: function (xhr) {
                console.log(xhr);
                let token = localStorage.getItem('access_token');
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.setRequestHeader('Accept', 'application/json');
                if (token) {
                    xhr.setRequestHeader('Authorization', `bearer ${token}`);
                }
            },
            complete: function (xhr) {
                console.log(xhr);
            }
        });
    }

    public static tokenNotExpired(tokenName?: string, jwt?: string) {
        let authToken: string = tokenName || 'access_token';
        let token: string;

        console.log('check token not expired');

        token = jwt && jwt !== 'undefined' ? jwt : localStorage.getItem(authToken);

        return !(!token || token === 'undefined');
    }

    public static isLoggedIn() {
        if (localStorage.getItem('access_token')) {
            return true;
        }
        return false;
    }
}
