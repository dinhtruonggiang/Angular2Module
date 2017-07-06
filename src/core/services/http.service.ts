import { AuthService } from './auth.service';
import { IHttpService, ErrorMessage } from './../interfaces/http-service.interface';
import { Http, RequestMethod, Request, RequestOptions, Headers, RequestOptionsArgs,
         URLSearchParams, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { ApiConfig } from '../../config/api.config';

// Rxjs
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Injectable()

export class HttpService implements IHttpService {

  private _apiPath = ApiConfig.url();

  constructor(
    private http: Http,
    private _authService: AuthService
  ) { }

  /**
   * Get current token stored in localStore/..
   * @readonly
   * @private
   * @type {string}
   * @memberof HttpService
   */
  private get TOKEN(): string {
    const token = this._authService.getToken();
    return token;
  }

  /**
   * Set headers each requests with authorization
   * @private
   * @returns
   * The headers contains assets token
   * @memberof HttpService
   */
  private setHeaders() {
    const authHeaders = new Headers();
    authHeaders.append('Content-Type', 'application/json');
    authHeaders.append('Accept', 'application/json');
    authHeaders.append('Authorization', 'bearer ' + this.TOKEN);
    return authHeaders;
  }

  private execute(options: any) {
    return this.http.request(new Request(options))
      .catch((res: Response) => {

        if (res.json())
          return Observable.throw(res.json());
        return Observable.throw(res);

      });
  }

  create(url: string, data: any) {

    const options = new RequestOptions({
      method: RequestMethod.Post,
      url: this._apiPath + url,
      withCredentials: true,
      body: JSON.stringify(data)
    });

    return this.execute(options);
  }

  update(url: string, data: any) {

    const options = new RequestOptions({
      method: RequestMethod.Put,
      url: this._apiPath + url,
      body: JSON.stringify(data)
    });

    return this.execute(options);
  }

  remove(url: string, id: any, headers?: any) {
    const options = new RequestOptions({
      method: RequestMethod.Delete,
      url: this._apiPath + url + '/' + id,
      headers: headers
    });

    return this.execute(options);
  }

  getAll(url: string) {

    const options = new RequestOptions({
      method: RequestMethod.Get,
      url: this._apiPath + url,
    });

    return this.execute(options);
  }

  getById(url: string, id: any) {
    const params: URLSearchParams = new URLSearchParams();
    params.set('id', id);
    const options = new RequestOptions({
      method: RequestMethod.Get,
      url: this._apiPath + url,
      search: params
    });

    return this.execute(options);
  }

  getQueries(url: string, queries: any): Observable<Response> {
    const params: URLSearchParams = new URLSearchParams();
    Object.keys(queries || {}).forEach(prop => {
      params.set(prop, queries[prop]);
    });
    const options = new RequestOptions({
      search: params
    });
    return this.get(url, options);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {

    const reqOpts = options || {};
    reqOpts.headers = reqOpts.headers ? new Headers(reqOpts.headers) : this.setHeaders();
    reqOpts.body = reqOpts.body || '';
    reqOpts.method = RequestMethod.Get;
    reqOpts.url = this._apiPath + url;

    return this.execute(reqOpts);
  }

  postData(url: string, data: any) {
    const options = new RequestOptions({
      method: RequestMethod.Post,
      url: this._apiPath + url,
      body: data
    });
    return this.execute(options);
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    const reqOpts = options || {};

    if (reqOpts.headers) {
      reqOpts.headers = new Headers(reqOpts.headers);
    } else {
      reqOpts.headers = this.setHeaders();
    }

    reqOpts.method = RequestMethod.Post;
    reqOpts.url = this._apiPath + url;
    reqOpts.body = body;

    return this.execute(reqOpts);
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    const reqOpts = options || {};

    if (reqOpts.headers) {
      reqOpts.headers = new Headers(reqOpts.headers);
    } else {
      reqOpts.headers = this.setHeaders();
    }

    reqOpts.method = RequestMethod.Put;
    reqOpts.url = this._apiPath + url;
    reqOpts.body = body || '';

    return this.execute(reqOpts);
  }

  delete(url: string, data?, options?: RequestOptionsArgs): Observable<Response> {
    const reqOpts = options || {};
    if (reqOpts.headers) {
      reqOpts.headers = new Headers(reqOpts.headers);
    } else {
      reqOpts.headers = this.setHeaders();
    }


    reqOpts.method = RequestMethod.Delete;
    reqOpts.url = this._apiPath + url;
    reqOpts.body = data;

    return this.execute(reqOpts);
  }
  patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    const reqOpts = options || {};

    if (reqOpts.headers) {
      reqOpts.headers = new Headers(reqOpts.headers);
    } else {
      reqOpts.headers = this.setHeaders();
    }

    reqOpts.method = RequestMethod.Patch;
    reqOpts.url = this._apiPath + url;
    reqOpts.body = body;

    return this.execute(reqOpts);
  }

  head(url: string, options?: RequestOptionsArgs): Observable<Response> {
    const reqOpts = options || {};

    if (reqOpts.headers) {
      reqOpts.headers = new Headers(reqOpts.headers);
    } else {
      reqOpts.headers = this.setHeaders();
    }


    reqOpts.method = RequestMethod.Head;
    reqOpts.url = this._apiPath + url;

    return this.execute(reqOpts);
  }

}
