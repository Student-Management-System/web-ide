/**
 * Kling-API
 * The Kling-API. <a href='http://localhost:3000/api-json'>JSON</a>
 *
 * OpenAPI spec version: 1.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */ /* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpEvent } from "@angular/common/http";
import { CustomHttpUrlEncodingCodec } from "../encoder";

import { Observable } from "rxjs";

import { AuthCredentialsDto } from "../model/authCredentialsDto";
import { AuthSystemCredentials } from "../model/authSystemCredentials";
import { AuthTokenDto } from "../model/authTokenDto";

import { BASE_PATH, COLLECTION_FORMATS } from "../variables";
import { Configuration } from "../configuration";

@Injectable()
export class AuthenticationService {
	protected basePath = "/";
	public defaultHeaders = new HttpHeaders();
	public configuration = new Configuration();

	constructor(
		protected httpClient: HttpClient,
		@Optional() @Inject(BASE_PATH) basePath: string,
		@Optional() configuration: Configuration
	) {
		if (basePath) {
			this.basePath = basePath;
		}
		if (configuration) {
			this.configuration = configuration;
			this.basePath = basePath || configuration.basePath || this.basePath;
		}
	}

	/**
	 * @param consumes string[] mime-types
	 * @return true: consumes contains 'multipart/form-data', false: otherwise
	 */
	private canConsumeForm(consumes: string[]): boolean {
		const form = "multipart/form-data";
		for (const consume of consumes) {
			if (form === consume) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Login
	 * Logs the user in to the StudentMgmt-Backend directly.
	 * @param body
	 * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
	 * @param reportProgress flag to report request and response progress.
	 */
	public login(
		body: AuthCredentialsDto,
		observe?: "body",
		reportProgress?: boolean
	): Observable<AuthTokenDto>;
	public login(
		body: AuthCredentialsDto,
		observe?: "response",
		reportProgress?: boolean
	): Observable<HttpResponse<AuthTokenDto>>;
	public login(
		body: AuthCredentialsDto,
		observe?: "events",
		reportProgress?: boolean
	): Observable<HttpEvent<AuthTokenDto>>;
	public login(
		body: AuthCredentialsDto,
		observe: any = "body",
		reportProgress: boolean = false
	): Observable<any> {
		if (body === null || body === undefined) {
			throw new Error("Required parameter body was null or undefined when calling login.");
		}

		let headers = this.defaultHeaders;

		// to determine the Accept header
		let httpHeaderAccepts: string[] = ["application/json"];
		const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(
			httpHeaderAccepts
		);
		if (httpHeaderAcceptSelected != undefined) {
			headers = headers.set("Accept", httpHeaderAcceptSelected);
		}

		// to determine the Content-Type header
		const consumes: string[] = ["application/json"];
		const httpContentTypeSelected:
			| string
			| undefined = this.configuration.selectHeaderContentType(consumes);
		if (httpContentTypeSelected != undefined) {
			headers = headers.set("Content-Type", httpContentTypeSelected);
		}

		return this.httpClient.request<AuthTokenDto>("post", `${this.basePath}/auth/login`, {
			body: body,
			withCredentials: this.configuration.withCredentials,
			headers: headers,
			observe: observe,
			reportProgress: reportProgress
		});
	}

	/**
	 * Login with token
	 * Logs the user in to the StudentMgmt-Backend via the credentials provided by the external authentication system.
	 * @param body
	 * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
	 * @param reportProgress flag to report request and response progress.
	 */
	public loginWithToken(
		body: AuthSystemCredentials,
		observe?: "body",
		reportProgress?: boolean
	): Observable<AuthTokenDto>;
	public loginWithToken(
		body: AuthSystemCredentials,
		observe?: "response",
		reportProgress?: boolean
	): Observable<HttpResponse<AuthTokenDto>>;
	public loginWithToken(
		body: AuthSystemCredentials,
		observe?: "events",
		reportProgress?: boolean
	): Observable<HttpEvent<AuthTokenDto>>;
	public loginWithToken(
		body: AuthSystemCredentials,
		observe: any = "body",
		reportProgress: boolean = false
	): Observable<any> {
		if (body === null || body === undefined) {
			throw new Error(
				"Required parameter body was null or undefined when calling loginWithToken."
			);
		}

		let headers = this.defaultHeaders;

		// to determine the Accept header
		let httpHeaderAccepts: string[] = ["application/json"];
		const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(
			httpHeaderAccepts
		);
		if (httpHeaderAcceptSelected != undefined) {
			headers = headers.set("Accept", httpHeaderAcceptSelected);
		}

		// to determine the Content-Type header
		const consumes: string[] = ["application/json"];
		const httpContentTypeSelected:
			| string
			| undefined = this.configuration.selectHeaderContentType(consumes);
		if (httpContentTypeSelected != undefined) {
			headers = headers.set("Content-Type", httpContentTypeSelected);
		}

		return this.httpClient.request<AuthTokenDto>(
			"post",
			`${this.basePath}/auth/loginWithToken`,
			{
				body: body,
				withCredentials: this.configuration.withCredentials,
				headers: headers,
				observe: observe,
				reportProgress: reportProgress
			}
		);
	}

	/**
	 * Register user
	 * Creates a new account.
	 * @param body
	 * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
	 * @param reportProgress flag to report request and response progress.
	 */
	public register(
		body: AuthCredentialsDto,
		observe?: "body",
		reportProgress?: boolean
	): Observable<any>;
	public register(
		body: AuthCredentialsDto,
		observe?: "response",
		reportProgress?: boolean
	): Observable<HttpResponse<any>>;
	public register(
		body: AuthCredentialsDto,
		observe?: "events",
		reportProgress?: boolean
	): Observable<HttpEvent<any>>;
	public register(
		body: AuthCredentialsDto,
		observe: any = "body",
		reportProgress: boolean = false
	): Observable<any> {
		if (body === null || body === undefined) {
			throw new Error("Required parameter body was null or undefined when calling register.");
		}

		let headers = this.defaultHeaders;

		// to determine the Accept header
		let httpHeaderAccepts: string[] = [];
		const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(
			httpHeaderAccepts
		);
		if (httpHeaderAcceptSelected != undefined) {
			headers = headers.set("Accept", httpHeaderAcceptSelected);
		}

		// to determine the Content-Type header
		const consumes: string[] = ["application/json"];
		const httpContentTypeSelected:
			| string
			| undefined = this.configuration.selectHeaderContentType(consumes);
		if (httpContentTypeSelected != undefined) {
			headers = headers.set("Content-Type", httpContentTypeSelected);
		}

		return this.httpClient.request<any>("post", `${this.basePath}/auth/register`, {
			body: body,
			withCredentials: this.configuration.withCredentials,
			headers: headers,
			observe: observe,
			reportProgress: reportProgress
		});
	}
}
