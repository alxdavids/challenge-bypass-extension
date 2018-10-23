/*
 * Config file for handling DLEQ proofs from edge
 *
 * @author: Alex Davidson
 */
/* exported DevCommitmentConfig */
/* exported ProdCommitmentConfig */
/* exported CHL_BYPASS_SUPPORT */
/* exported CHL_BYPASS_RESPONSE */
/* exported PPConfigs */

const CHL_BYPASS_SUPPORT  = "cf-chl-bypass"; // header from server to indicate that Privacy Pass is supported
const CHL_BYPASS_RESPONSE = "cf-chl-bypass-resp"; // response header from server, e.g. with erorr code

const exampleConfig = {
	"id": 0,
	"sign": true, // sets whether tokens should be sent for signing
	"redeem": true, // sets whether tokens should be sent for redemption
	"sign-reload": true, // whether pages should be reloaded after signing tokens (e.g. to immediately redeem a token)
	"sign-resp-format": "string", // formatting of response to sign request (string or json)
	"storage-key-tokens": "eg-bypass-tokens", // key for local storage for accessing stored tokens
	"storage-key-count": "eg-token-count", // key for local storage token count
	"max-spends": 3, // for each host header, sets the max number of tokens that will be spent
	"max-tokens": 10, // max number of tokens held by the extension
	"tokens-per-request": 5, // number of tokens sent for each signing request (e.g. 30 for CF)
	"var-reset": true, // whether variables should be reset after time limit expires
	"var-reset-ms": 100, // variable reset time limit
	"commitments": {
		"dev": {
			"G": "",
			"H": "",
		},
		"prod": {
			"G": "", // public generator of P256
			"H": "", // public generator raised by power of secret key in GF(p)
		}
	}, // public key commitments for verifying DLEQ proofs (dev/prod) in curve P256
	"spending-restrictions": {
		"status-code": [200], // array of status codes that should trigger token redemption (e.g. 403 for CF)
		"iframe": false, // set true if redemption should only occur in iframe
		"max-redirects": "3", // when page redirects occur, sets the max number of redirects that tokens will be spent on
		"new-tabs": ["about:privatebrowsing", "chrome://", "about:blank"], // urls that should not trigger page reloads/redemptions (these should probably be standard)
		"bad-navigation": ["auto_subframe"], // navigation types that should not trigger page reloads/redemptions (see: https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/webNavigation/TransitionType)
		"bad-transition": ["server_redirect"], // transition types that should not trigger page reloads/redemptions (see: https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/webNavigation/TransitionType)
		"valid-redirects": ["https://","https://www.","http://www."], // valid redirects that should trigger token redemptions
		"valid-transitions": ["link", "typed", "auto_bookmark", "reload"], // transition types that fine for triggering redemptions (see: https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/webNavigation/TransitionType)
	}, // These spending restrictions are examples that apply in the CF case
	"spend-action": {
		"urls": "<all_urls>", // urls that listeners act on
		"redeem-method": "", // what method to use to perform redemption, currently we support "reload" for CF.
		"header-name": "challenge-bypass-token", // name of header for sending redemption token
	},
	"cookies": {
		"check-cookies": true, // whether cookies should be checked before spending
		"clearance-cookie": "", // name of clearance cookies for checking (cookies that are optionally acquired after redemption occurs)
	},
	"captcha-domain": "", // optional domain for acquiring tokens
	"error-codes": {
		"verify-error": "5", // error code sent by server for verification error
		"connection-error": "6", // error code sent by server for connection error
	} // generic error codes (can add more)
}

// The configuration used by Cloudflare
const cfConfig = {
	"id": 1,
	"sign": true,
	"redeem": true,
	"sign-reload": true,
	"sign-resp-format": "string",
	"storage-key-tokens": "cf-bypass-tokens",
	"storage-key-count": "cf-token-count",
	"max-redirects": 3,
	"max-spends": 3,
	"max-tokens": 300,
	"tokens-per-request": 30,
	"var-reset": true,
	"var-reset-ms": 2000,
	"commitments": {
		"dev": {
			"G": "BIpWWWWFtDRODAHEzZlvjKyDwQAdh72mYKMAsGrtwsG7XmMxsy89gfiOFbX3RZ9Ik6jEYWyJB0TmnWNVeeZBt5Y=",
			"H": "BKjGppSCZCsL08YlF4MJcml6YkCglMvr56WlUOFjn9hOKXNa0iB9t8OHXW7lARIfYO0CZE/t1SlPA1mXdi/Rcjo=",
		},
		"prod": {
			"G": "BOidEuO9HSJsMZYE/Pfc5D+0ELn0bqhjEef2O0u+KAw3fPMHHXtVlEBvYjE5I/ONf9SyTFSkH3mLNHkS06Du6hQ=",
			"H": "BHOPNAWXRi4r/NEptOiLOp8MSwcX0vHrVDRXv16Jnowc1eXXo5xFFKIOI6mUp8k9/eca5VY07dBhAe8QfR/FSRY=",
		}
	},
	"spending-restrictions": {
		"status-code": [403],
		"iframe": false,
		"max-redirects": "3",
		"new-tabs": ["about:privatebrowsing", "chrome://", "about:blank"],
		"bad-navigation": ["auto_subframe"],
		"bad-transition": ["server_redirect"],
		"valid-redirects": ["https://","https://www.","http://www."],
		"valid-transitions": ["link", "typed", "auto_bookmark", "reload"],
	},
	"spend-action": {
		"urls": "<all_urls>",
		"redeem-method": "reload",
		"header-name": "challenge-bypass-token",
	},
	"cookies": {
		"check-cookies": true,
		"clearance-cookie": "cf_clearance"
	},
	"captcha-domain": "captcha.website",
	"error-codes": {
		"verify-error": "5",
		"connection-error": "6",
	}
};

// Ordering of configs should correspond to value of cf-chl-bypass header
// i.e. the first config should have "id": 1, the second "id":2, etc.
const PPConfigs = [exampleConfig,cfConfig];
