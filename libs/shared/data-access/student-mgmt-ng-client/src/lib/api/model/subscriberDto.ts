/**
 * Student-Management-System-API
 * The Student-Management-System-API. <a href=\'http://localhost:3000/api-json\'>JSON</a>
 *
 * The version of the OpenAPI document: 1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

export interface SubscriberDto {
	/**
	 * Name of your application.
	 */
	name: string;
	/**
	 * Complete URL to an endpoint in your application that receives HTTP-POST messages.
	 */
	url: string;
	/**
	 * Map of events that you want to be notified about. Refer to the Event-Enum for event names. You can use \'ALL\' to subscribe to all events.
	 */
	events: object;
	/**
	 * Date of the creation or latest update to the subscription.
	 */
	updateDate?: string;
}
