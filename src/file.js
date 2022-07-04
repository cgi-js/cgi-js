/*
License: MIT
Dynamic CGI serving using dynamic path imports for 
	 CGI supporting executable for Interpreted languages Embedded Distribution
Contribution: 2018 Ganesh K. Bhat <ganeshsurfs@gmail.com> 

TODO:
Move from shelljs to without dependencies - L3
Move from child_process spawn to child_process exec - L2 (Next version)
*/

/* eslint no-console: 0 */
const process = require('process');
const { env } = require('process');
const child = require('child_process');
const path = require('path');
const fs = require('fs');
const shell = require('shelljs');
const { resolve } = require('path');

const utils = require('./utils')();
const processModule = require("./process")();
const setter = utils.setter, getter = utils.getter, error = utils.error;


/**
 * execute
 * Alternate Process based CGI execution Model for CGI Module
 *
 * @return {FileModuleObject} 
 */
function execute() {
	let ruby = "ruby", perl = "perl", python = "python", php = "php", phpCgi = "php-cgi", node = "node", cgi = "cgi", deno = "deno", ts = "tsc";
	let python3 = ((process.platform === "win32") ? 'python' : 'python3');

	/** @type {LangOptionsObject<[key: String]: String>} */
	let langOptionsObject = { "name": '', "cgi": '', "which": '', "type": "", "pattern": null };


	/** @type {LanguageOptionsObject< [key: String] : LangOptionsObject<Object> >} */
	let LANG_OPTS = {
		"rb": { "name": "ruby", "cgi": ruby, "which": "", "type": "rb", "pattern": /.*?\.rb$/ },
		"pl": { "name": "perl", "cgi": perl, "which": "", "type": "pl", "pattern": /.*?\.pl$/ },
		"plc": { "name": "perl", "cgi": perl, "which": "", "type": "plc", "pattern": /.*?\.plc$/ },
		"pld": { "name": "perl", "cgi": perl, "which": "", "type": "pld", "pattern": /.*?\.pld$/ },
		"py3": { "name": "python3", "cgi": ((process.platform === "win32") ? 'python' : 'python3'), "which": "", "type": "py", "pattern": /.*?\.py$/ },
		"py": { "name": "python", "cgi": python, "which": "", "type": "py", "pattern": /.*?\.py$/ },
		"php": { "name": "php", "cgi": php, "which": "", "type": "php", "pattern": /.*?\.php$/ },
		"php-cgi": { "name": "php-cgi", "cgi": phpCgi, "which": "", "type": "php-cgi", "pattern": /.*?\.php$/ },
		"node": { "name": "node", "cgi": node, "which": "", "type": "node", "pattern": /.*?\.js$/ },
		"deno": { "name": "deno", "cgi": deno, "which": "", "type": "deno", "pattern": /.*?\.ts$/ },
		"ts": { "name": "ts", "cgi": ts, "which": "", "type": "ts", "pattern": /.*?\.ts$/ },
		"cgi": { "name": "cgi", "cgi": cgi, "which": "", "type": "cgi", "pattern": /.*?\.cgi$/ }
	}


	/**
	 * getEnvironment
	 * 
	 *
	 * @param {RequestObject<{ url: String, originalUrl: String, query: String, method: String, body: String, ip: String, headers: String }>} request
	 * @param {String} host
	 * @param {Number} port
	 * @return {Object} EnvironmentVariableObject
	 */
	function getEnvironment(request, host, port) {
		return {
			SERVER_SIGNATURE: 'DesktopCGI: NodeJS server at localhost',
			PATH_INFO: request.pathinfo,
			PATH_TRANSLATED: '',
			SCRIPT_NAME: request.url.pathname,
			SCRIPT_FILENAME: request.file,
			REQUEST_FILENAME: request.file,
			SCRIPT_URI: request.file,
			URL: request.originalUrl,
			SCRIPT_URL: request.url.originalUrl,
			REQUEST_URI: request.url.originalUrl,
			REQUEST_METHOD: request.method,
			QUERY_STRING: request.query || '',
			CONTENT_TYPE: request.headers['Content-Type'] || '',
			CONTENT_LENGTH: request.headers['Content-Length'] || 0,
			AUTH_TYPE: '',
			AUTH_USER: '',
			REMOTE_USER: '',
			ALL_HTTP: Object.keys(request.headers).map(function (x) {
				return 'HTTP_' + x.toUpperCase().replace('-', '_') + ': ' + request.headers[x];
			}).reduce(function (a, b) {
				return a + b + '\n';
			}, ''),
			ALL_RAW: Object.keys(request.headers).map(function (x) {
				return x + ': ' + request.headers[x];
			}).reduce(function (a, b) {
				return a + b + '\n';
			}, ''),
			SERVER_SOFTWARE: 'NodeJS',
			SERVER_NAME: 'localhost',
			SERVER_ADDR: host,
			SERVER_PORT: port,
			GATEWAY_INTERFACE: 'CGI/1.1',
			SERVER_PROTOCOL: '',
			REMOTE_ADDR: request.ip || '',
			REMOTE_PORT: '',
			DOCUMENT_ROOT: '',
			INSTANCE_ID: '',
			APPL_MD_PATH: '',
			APPL_PHYSICAL_PATH: '',
			IS_SUBREQ: '',
			REDIRECT_STATUS: 1
		};
	}


	/**
	 * getBinPath
	 *
	 * @param {ExecuteOptions<{ name: String, type: String, os: String, exe: String, cmds: Object<{ run: Object<{ exe: String, usage: String, args: String[] }> }>, options: Object<{ stdio: String, shell: Boolean }>, other: Object<{ paths: Object<{ conf: String, exe: String }>, env: Object, setprocess: Boolean, executetype: String, command: String }> }>} exeOptions
	 * @return {String | Boolean} WHICH_CGI
	 */
	function getBinPath(exeOptions) {
		if (typeof exeOptions.bin === "string") {
			/*
			 * Return bin string
			*/
			return exeOptions.bin;
		} else if (typeof exeOptions.bin === "object") {
			if (!!exeOptions.bin.bin_path && exeOptions.bin.bin_path.trim() !== "") {
				/*
				 * Return bin.bin_path string from .bin object
				*/
				return exeOptions.bin.bin_path;
			}
		}
		try {
			/*
			 * Return which .cgi string
			*/
			return shell.which(exeOptions.cgi);
		} catch (e) {
			/*
			 * Invoke error and return Falsy Boolean
			*/
			error("getBinPath: bin path config type definition error " + e.toString(), false);
			return false;
		}
	}


	/**
	 * setCGI
	 *
	 * @param {ExecuteOptions<{ name: String, type: String, os: String, exe: String, cmds: Object<{ run: Object<{ exe: String, usage: String, args: String[] }> }>, options: Object<{ stdio: String, shell: Boolean }>, other: Object<{ paths: Object<{ conf: String, exe: String }>, env: Object, setprocess: Boolean, executetype: String, command: String }> }>} exeOptions
	 * @return {Boolean} boolean
	 */
	function setCGI(exeOptions) {
		try {

			/**
			 * Key elements name, cgi, bin, type, pattern from
			 * 		ExecuteOptions<Object>
			 */
			let { name, cgi, bin, type, pattern } = exeOptions;

			/*
			 * Throw error even if one key is not defined
			 */
			if (!name && !cgi && !bin && !type && !pattern) {
				throw new Error("setCGI: All properties not defined");
			}

			/** @type {WHICH_CGI<String>} */
			let WHICH_CGI;
			if (typeof exeOptions.bin === "string") {
				/*
				 * .which for .bin string cgi
				 */
				WHICH_CGI = shell.which(bin, cgi);
			} else if (typeof exeOptions.bin === "object" && !!bin.bin_path) {
				/*
				 * .which for .bin.bin_path string cgi
				 */
				WHICH_CGI = shell.which(bin.bin_path, cgi);
			} else {
				/*
				 * .which for default installed cgi
				 */
				WHICH_CGI = shell.which(cgi);
			}

			/** @type {*} */
			let options = { name: name, cgi: cgi, bin: bin, which: WHICH_CGI, type: type, pattern: pattern };

			/** @type {*} */
			let set = utils.setter(LANG_OPTS, options);

			/*
			 * Set LANG_OPTS if the setter worked
			 */
			if (!!set) { LANG_OPTS = set };

			/*
			 * Return Truthy Boolean after setter
			*/
			return true;
		} catch (e) {
			/*
			 * Invoke error and return Falsy Boolean if any of above operations failed
			*/
			error("setCGI: CGI Executable fetch error" + e.toString(), false);
			return false;
		}
	}


	/**
	 * getCGI
	 *
	 * @param {String} type
	 * @return {LangOptionsObject} LanguageOptionsType
	 */
	function getCGI(type) {
		/*
		 * Get type of CGI from LANG_OPTS
		 */
		return getter(LANG_OPTS, type);
	}


	/**
	 * getType
	 * 
	 * @param {*} type
	 * @return {*} 
	 */
	function getType(type) {
		return (!!getter(LANG_OPTS, type)) ? type : false;
	}


	/**
	 * fileExists
	 *
	 * @param {String} type
	 * @param {ExecuteOptions <{ name: String, type: String, os: String, exe: String, cmds: Object<{ run: Object<{ exe: String, usage: String, args: String[] }> }>, options: Object<{ stdio: String, shell: Boolean }>, other: Object<{ paths: Object<{ conf: String, exe: String }>, env: Object, setprocess: Boolean, executetype: String, command: String }> }>} exeOptions
	 * @return {Promise} FilePathStringPromise
	 */
	function fileExists(type, exeOptions) {
		return new Promise(async function (resolve, reject) {
			/**
			 * 
			 * @param {String} f 
			 */
			let feFn = function (f) {
				(!!f) ? resolve(f) : reject(f);
			}

			try {

				/** @type {*} */
				let file = path.join((!!exeOptions.embed.path) ? exeOptions.embed.path : "", (!!exeOptions.script.path) ? exeOptions.script.path : "", (!!exeOptions.script.file) ? exeOptions.script.file : "");

				/** @type {*} */
				let statsObj = fs.statSync(file);

				/*
				 * Check if the file is a directory
				 */
				if (statsObj.isDirectory()) {
					feFn(path.join(exeOptions.web_root_folder, 'index.' + type));
				}

				/**
				 * Resolve file path being present
				*/
				feFn(file);
			} catch (e) {
				/**
				 * Reject file path being present
				*/
				feFn(false);
			}
		});
	}


	/**
	 * processExecute
	 *
	 * @param {ExecuteOptions <{ name: String, type: String, os: String, exe: String, cmds: Object<{ run: Object<{ exe: String, usage: String, args: String[] }> }>, options: Object<{ stdio: String, shell: Boolean }>, other: Object<{ paths: Object<{ conf: String, exe: String }>, env: Object, setprocess: Boolean, executetype: String, command: String }> }>} config
	 * @param {DataHandlerObject<{ (error: any, stdout: any, stderr: any) => any }>} datahandler
	 * @param {CloseHandlerObject<{ (options: any, proc: any) => any }>} closehandler
	 * @return {Promise} ProcessObjectPromise
	 */
	function processExecute(config, datahandler, closehandler, exithandler) {
		return new Promise(function (resolve, reject) {
			/**
			 * dataHandler
			 *
			 * @param {*} error
			 * @param {*} stdout
			 * @param {*} stderr
			 */
			function dataHandler(error, stdout, stderr) {
				// let result = (!!datahandler) ? datahandler(error, stdout, stderr) : null;
				resolve({ error, stdout, stderr });
			};

			/**
			 * closeHandler
			 *
			 * @param {*} options
			 * @param {*} proc
			 */
			function closeHandler(options, proc) {
				let result = (!!closehandler) ? closehandler(options, proc) : null;
			}

			if (!exithandler) {
				exithandler = (arguments) => { }
			}

			/** @type {Action<String>} */
			let action = (!!config.other) ? (!!config.other.command) ? config.other.command : "generic" : "generic";

			/** @type {CloseEventList<String[]>} */
			let evt = [`close`, `end`, `exit`, `SIGHUP`, `SIGQUIT`, `SIGKILL`, `SIGINT`, `SIGTERM`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`];

			let evtLen = evt.length;

			/*
			 * Register listeners for close, exit, and kill
			 */
			for (let i = 0; i < evtLen; i++) {
				process.on(evt[i], exithandler);
			}

			config["other"]["command"] = action;
			return processModule.process.executeProcess(config, dataHandler, closeHandler);
		});
	}


	/**
	 * serve
	 * 
	 * 
	 * @param {String} type
	 * @param {RequestObject <{ url: String, originalUrl: String, query: String, method: String, body: String, ip: String, headers: String }>} requestObject
	 * @param {ExecuteOptions <{ name: String, type: String, os: String, exe: String, cmds: Object<{ run: Object<{ exe: String, usage: String, args: String[] }> }>, options: Object<{ stdio: String, shell: Boolean }>, other: Object<{ paths: Object<{ conf: String, exe: String }>, env: Object, setprocess: Boolean, executetype: String, command: String }> }>} exeOptions
	 * @return {Promise} CGIResponseObjectPromise
	 */
	function serve(type, requestObject, exeOptions, datahandler, closehandler, exithandler) {
		return new Promise(function (resolve, reject) {

			if (!exithandler) {
				exithandler = (arguments) => { }
			}

			/**
			 * Fetching and Throwing error if CGI Type is not defined
			 */
			try {
				type = getType(type);
			} catch (e) {
				reject({ headers: {}, response: e.toString() || "Error in Environments or Path", statusCode: 500 });
			}

			/**
			 * Fetching and Setting if CGI is not registered
			 * Throwing error if CGI Executable is not set
			 */
			if (!getCGI(type)) {
				if (!setCGI(exeOptions)) {
					throw new Error("filejs: Error setting file");
				};
			}

			/**
			 * Executing fileExists function with arguments
			 * 		type, exeOptions
			*/
			fileExists(type, exeOptions).then(function (f) {
				/**
				 * CGI file (f)
				 */
				if (!f) {
					reject({ headers: {}, response: "serve: File serve promise error: 1 ", statusCode: 500 });
				}

				/**
				 * CGI Config template
				 */
				let config = require("./templatespawn");

				/**
				 * CGI Executable Options
				 */
				let config_options;

				/**
				 * CGI Command Executable Options
				 */
				let cmd_options;

				/** 
				 * Creating a string config's options commandline for the CGI executable
				 * The user decides to combine both CGI Configs options and Commandline Options into one
				 * Leaving this optional for the user to decide
				*/
				if (typeof exeOptions.embed.options === "object") {
					let j = Object.keys(exeOptions.embed.options);
					config_options = "";
					for (let i = 0; i < j.length; i++) {
						config_options += [j[i], exeOptions.embed.options[j[i]].seperator, exeOptions.embed.options[j[i]].value].join(exeOptions.script.seperator);
					}
				}

				/** 
				 * Creating a string execution command line's options for the CGI executable
				 * The user decides to combine both CGI Configs options and Commandline Options into one
				 * Leaving this optional for the user to decide
				 * 
				*/
				if (typeof exeOptions.script.options === "object") {
					let k = Object.keys(exeOptions.script.options);
					cmd_options = "";
					for (let i = 0; i < k.length; i++) {
						cmd_options += [k[i], exeOptions.script.options[k[i]].seperator, exeOptions.script.options[k[i]].value].join(exeOptions.script.seperator);
					}
				} else if (typeof exeOptions.script.options === "string") {
					cmd_options = exeOptions.script.options;
				}

				/** 
				 * Assigning name, and cmd.exe, cmd.args value for
				 * 		the config of CGI executable
				*/
				config["name"] = "";
				config["cmds"][config.other.command] = {
					"exe": path.join(exeOptions.embed.bin, type),
					"args": [config_options, cmd_options, path.join(exeOptions.embed.path, exeOptions.script.path, exeOptions.script.file)]
				};

				/** 
				 * Assigning other.paths.conf, other.paths.exe, and other.paths.env value for
				 * 		the config.other of CGI executable
				*/
				config.other.paths.conf = exeOptions.embed.config.argument + exeOptions.embed.config.seperator + exeOptions.embed.config.file;
				config.other.paths.exe = exeOptions.embed.path || "";
				config.other["env"] = getEnvironment(requestObject, exeOptions.script.server.host, exeOptions.script.server.port);

				/**
				 * CGI execution with arguments of 
				 * 		requestObject, exeOptions, config
				 */
				return processExecute(config, datahandler, closehandler).then(function (r) {
					/** 
					 * Resolving Result
					*/
					resolve(r);
				}).catch(function (e) {
					/** 
					 * Rejecting error of executeCGI
					*/
					reject({ headers: {}, response: "serve: File serve promise error: 2 " + e.toString(), statusCode: 500 });
				});
			}).catch(function (e) {
				/** 
				 * Rejecting error of fileExists
				*/
				reject({ headers: {}, response: "serve: File serve promise error: 3 " + e.toString(), statusCode: 500 });
			});
		});
	}


	return {
		setter: {
			cgi: setCGI
		},
		getter: {
			cgi: getCGI,
			bin: getBinPath,
			env: getEnvironment
		},
		exists: fileExists,
		execute: processExecute,
		serve: serve
	}
}


/**
 * cgiServe
 * CGI File Handler
 * 
 * 
 * @returns { Object } CGI Serve File module functions
 * 		Module Object ==> { CGI Serve File handler Object }
 * 
 * 			setter [object]: {
 *				which [function],
 *				cgiTypes [function]
 *			},
 *			getter [object]: {
 *				which [function],
 *				cgiTypes [function],
 *				vars [function],
 *				env [function]
 *			},
 *			runCGI [function],
 *			serve [function]
 * 
 */
function cgiServe() {
	let ruby = "ruby", perl = "perl", python = "python", php = "php", node = "node";
	let python3 = ((process.platform === "win32") ? 'python' : 'python3');
	let langOptions = { "name": '', "cgi": '', "which": '', "type": "", "pattern": null };
	let LANG_OPTS = {
		"rb": { "name": ruby, "cgi": ruby, "which": "", "type": "rb", "pattern": /.*?\.rb$/ },
		"pl": { "name": perl, "cgi": perl, "which": "", "type": "pl", "pattern": /.*?\.pl$/ },
		"plc": { "name": perl, "cgi": perl, "which": "", "type": "plc", "pattern": /.*?\.plc$/ },
		"pld": { "name": perl, "cgi": perl, "which": "", "type": "pld", "pattern": /.*?\.pld$/ },
		"py3": { "name": python3, "cgi": python3, "which": "", "type": "py", "pattern": /.*?\.py$/ },
		"py": { "name": python, "cgi": python, "which": "", "type": "py", "pattern": /.*?\.py$/ },
		"php": { "name": php, "cgi": php + "-cgi", "which": "", "type": "php", "pattern": /.*?\.php$/ },
		"node": { "name": node, "cgi": node, "which": "", "type": "node", "pattern": /.*?\.js$/ }
	}


	/**
	 *
	 * getBinPath
	 * 
	 * @param { String } action
	 * 
	 * @param { Object } exeOptions
	 * 
	 * @returns { String } bin_path / {throw error} 
	 * 
	 */
	function getBinPath(action, exeOptions) {
		if (typeof exeOptions.bin === "string") {
			return exeOptions.bin;
		} else if (typeof exeOptions.bin === "object") {
			if (!!exeOptions.bin.useDefault || !!exeOptions.bin.bin_path) {
				if (exeOptions.bin.bin_path.trim() !== "") {
					return exeOptions.bin.bin_path;
				}
				return "";
			} else {
				return error("getBinPath: bin path config type definition error", false);
			}
		}
	}


	/**
	 * 
	 * validateLangOptionStructure
	 * 
	 * @param  { Object } obj
	 * 
	 * @returns { Boolean } validated
	 * 
	 */
	function validateLangOptionStructure(obj) {
		let k = Object.keys(obj), l = Object.keys(langOptions);
		for (let i = 0; i < l.length; i++) {
			if (k.indexOf(l[i]) >= 0) {
				return false;
			}
		}
		return true;
	}


	/**
	 * 
	 * setCGI
	 * 
	 * @param { String } cgiExecutable
	 * 
	 * @param { Object } exeOptions
	 * 
	 * @param { String } type
	 * 
	 * @returns { Boolean  | throw error } set?
	 * 
	 */

	function setCGI(type, cgiExecutable, exeOptions) {
		try {
			let WHICH_CGI = shell.which(path.join(!!exeOptions.bin.bin_path ? exeOptions.bin.bin_path : exeOptions.bin, cgiExecutable));
			if (!!LANG_OPTS[type]) {
				LANG_OPTS[type].which = WHICH_CGI;
				return true;
			} else {
				return error("setCGI: CGI Executable type apply error", false);
			}
		} catch (e) {
			return error("setCGI: CGI Executable fetch error", false);
		}
	}


	/**
	 *
	 * getCGI
	 * 
	 * @param { String } type
	 * 
	 * @param { Object } exeOptions
	 * 
	 * @returns { String } WHICH_CGI
	 * 
	 */

	function getCGI(type, exeOptions = {}) {
		try {
			if (!LANG_OPTS[type].which) {
				let cgiset = setCGI(type, LANG_OPTS[type], exeOptions);
			}
			return LANG_OPTS[type].which;
		} catch (e) {
			return error("getCGI: CGI Executable fetch error " + e.toString(), false);
		}
	}


	/**
	 *
	 * setCGITypes
	 * 
	 * @param { String } cgiLang
	 * 
	 * @returns { Boolean } / {throw error}
	 * 
	 */
	function setCGITypes(cgiLang) {
		if (Array.isArray(cgiLang)) {
			for (let i = 0; i < cgiLang.length; i++) {
				let res = validateLangOptionStructure(cgiLang[i]);
				if (!res) { return res; }
			}
			langOptions.push(...cgiLang);
			return true;
		} else if (typeof (cgiLang) === 'object') {
			let res = validateLangOptionStructure(cgiLang[i]);
			if (!res) { return res; }
			langOptions.push(cgiLang);
			return true;
		}
		return error("setCGITypes: Incorrect Type provided", false);
	}


	/**
	 *
	 * getCGITypes
	 * 
	 * @param { String | Array } cgiLang
	 * 
	 * @returns { Object LANG_OPTS | String LANG_OPTS[type] } Reconsider sending back all LangOpts
	 * 
	 */
	function getCGITypes(cgiLang) {
		if (typeof (cgiLang) === 'string') {
			return LANG_OPTS[cgiLang];
		} else if (Array.isArray(cgiLang)) {
			let l = [];
			for (let i = 0; i < cgiLang.length; i++) {
				l.push(cgiLang[i]);
			}
			return l;
		}
		return LANG_OPTS;
	}


	/**
	 *
	 * cleanPath
	 * 
	 * @param { Object } exeOptions
	 * 
	 * @returns { Object } {LANG_OPTS, exeOptions}
	 * 
	 */
	function cleanPath(exeOptions) {
		if (typeof (exeOptions.bin) === 'object' && !!exeOptions.bin.useDefault) {
			exeOptions.bin = {
				bin_path: getBinPath("getCGI", exeOptions),
				useDefault: exeOptions.bin.useDefault
			};
		} else {
			exeOptions.bin = {
				bin_path: getBinPath("getCGI", exeOptions),
			};
		}
		return {
			LANG_OPTS: LANG_OPTS,
			exeOptions: exeOptions
		};
	}


	/**
	 *
	 * getVars
	 * 
	 * @param { String } type
	 * 
	 * @param { Object } exeOptions
	 * 
	 * @returns { Object } {LANG_OPTS, exeOptions}
	 * 
	 */
	function getVars(exeOptions) {
		return cleanPath(exeOptions);
	}


	/**
	 *
	 * getEnv
	 * 
	 * @param { Object } req
	 * 
	 * @param { String } host
	 * 
	 * @param { Number } port
	 * 
	 * @returns { Object } env(environment)
	 * 
	 */
	function getEnv(req, host, port) {
		var env = {
			SERVER_SIGNATURE: 'NodeJS server at localhost',
			PATH_INFO: req.pathinfo,
			PATH_TRANSLATED: '',
			SCRIPT_NAME: req.url.pathname,
			SCRIPT_FILENAME: req.file,
			REQUEST_FILENAME: req.file,
			SCRIPT_URI: req.file,
			URL: req.originalUrl,
			SCRIPT_URL: req.url.originalUrl,
			REQUEST_URI: req.url.originalUrl,
			REQUEST_METHOD: req.method,
			QUERY_STRING: req.query || '',
			CONTENT_TYPE: req.headers['Content-Type'] || '',
			CONTENT_LENGTH: req.headers['Content-Length'] || 0,
			AUTH_TYPE: '',
			AUTH_USER: '',
			REMOTE_USER: '',
			ALL_HTTP: Object.keys(req.headers).map(function (x) {
				return 'HTTP_' + x.toUpperCase().replace('-', '_') + ': ' + req.headers[x];
			}).reduce(function (a, b) {
				return a + b + '\n';
			}, ''),
			ALL_RAW: Object.keys(req.headers).map(function (x) {
				return x + ': ' + req.headers[x];
			}).reduce(function (a, b) {
				return a + b + '\n';
			}, ''),
			SERVER_SOFTWARE: 'NodeJS',
			SERVER_NAME: 'localhost',
			SERVER_ADDR: host,
			SERVER_PORT: port,
			GATEWAY_INTERFACE: 'CGI/1.1',
			SERVER_PROTOCOL: '',
			REMOTE_ADDR: req.ip || '',
			REMOTE_PORT: '',
			DOCUMENT_ROOT: '',
			INSTANCE_ID: '',
			APPL_MD_PATH: '',
			APPL_PHYSICAL_PATH: '',
			IS_SUBREQ: '',
			REDIRECT_STATUS: 1
		};
		return env;
	}


	/**
	 *
	 * getPattern
	 * 
	 * @param { String } type
	 * 
	 * @returns { ^regex pattern } pattern / {throw error}
	 * 
	 */
	function getPattern(type) {
		let ty = LANG_OPTS[type];
		if (!!ty && !!ty.pattern && ty.pattern !== "") {
			return ty.pattern;
		}
		return error("getPattern: Pattern does not exist " + pattern.toString(), false);
	}


	/**
	 *
	 * getType
	 * 
	 * @param { String } type
	 * 
	 * @returns { String } type / {throw error}
	 * 
	 */
	function getType(type) {
		let ty = LANG_OPTS[type];
		if (!!ty && !!ty.type && ty.type !== "") {
			return ty.type;
		}
		return error("getType: Type does not exist " + type.toString(), false);
	}


	/**
	 *
	 * getPHPHtml
	 * 
	 * @param { Array } lines
	 * 
	 * @returns { Object } {html}
	 * 
	 */
	function getPHPHtml(lines) {
		var line = 0, headers = {}, statusCode;
		do {
			var m = lines[line].split(': ');
			if (m[0] === '') break;
			if (m[0] == 'Status') {
				statusCode = parseInt(m[1]);
			}
			if (m.length == 2) {
				headers[m[0]] = m[1];
			}
			line++;
		} while (lines[line] !== '');
		html = lines.splice(line + 1).join('\n')
		return {
			response: html,
			headers: headers,
			statusCode: statusCode
		};
	}


	/**
	 *
	 * getCGIHtml
	 * 
	 * @param { String } lines
	 * 
	 * @returns { Object } {html, res}
	 * 
	 */
	function getCGIHtml(lines) {
		var line = 0, headers = {}, statusCode;
		for (var i = 0; i < lines.length; i++) {
			if (lines[line] !== '') {
				try {
					var m = lines[line].split(': ');
					if (m[0] === '') break;
					if (m[0] == 'Status') {
						statusCode = parseInt(m[1]);
					}
					if (m.length == 2) {
						headers[m[0]] = m[1];
					}
				} catch (err) {
					console.error("getCGIHtml: ", err)
					return error(err.toString(), false);
				}
			}
		}
		html = lines.join('\n')
		return {
			response: html,
			headers: headers,
			statusCode: statusCode
		};
	}


	/**
	 *
	 * fileExists
	 * 
	 * @param { String } type
	 * 
	 * @param { Object } exeOptions
	 * 
	 * @returns { Object promise } resolve(file/bool)
	 * 
	 */
	function fileExists(type, exeOptions) {
		return new Promise(function (resolve, reject) {
			let feFn = function (f) {
				(!!f) ? resolve(f) : resolve(false);
			}
			let file = path.join(exeOptions.web_root_folder);
			fs.stat(file, function (err, stat) {
				if (!!err || stat.isDirectory()) {
					if (!!stat && stat.isDirectory()) {
						file = path.join(file, 'index.' + type);
					}
					if (file.includes(process.cwd())) {
						fs.exists(file, function (exists) {
							if (!!exists) { feFn(file); }
						});
					} else {
						fs.exists(path.join(process.cwd(), file), function (exists) {
							if (!!exists) { feFn(file); }
						});
					}
				}
				else {
					feFn(file);
				}
			});
		});
	}


	/**
	 *
	 * runCGI
	 * 
	 * @param { Object req } req
	 * 
	 * @param { Object } exeOptions
	 * 
	 * @returns { Promise }
	 * 
	 */
	function runCGI(req, exeOptions) {
		return new Promise(function (resolve, reject) {
			let index = req.originalUrl.indexOf('.' + req.type);
			req["pathinfo"] = (index >= 0) ? req.url.pathname.substring(index + req.type.length + 1) : req.url.pathname;
			let env = getEnv(req, exeOptions.host, exeOptions.port);
			Object.keys(req.headers).map(function (x) {
				return env['HTTP_' + x.toUpperCase().replace('-', '_')] = req.headers[x];
			});
			if (!!req.pattern_chk.test(path.join(process.cwd(), req.file))) {
				let tmp_result = '', err = '', proc, executable;
				if ((!!exeOptions.bin.bin_path) && (('/' + LANG_OPTS[req.type].cgi).length !== exeOptions.bin.bin_path.length)) {
					executable = exeOptions.bin.bin_path + "/" + LANG_OPTS[req.type].cgi;
				} else {
					if (!LANG_OPTS[req.type]["which"]) {
						try {
							error('"runCGI: cgi executable" cannot be found, "which" Error ', false)
						} catch (e) {
							reject({
								headers: {},
								statusCode: 500,
								response: e.toString() + " - Executable not found"
							});
						}
					}
					let p = exeOptions.bin.bin_path.split('/')[1];
					executable = ((!!p) ? p + "/" : "") + LANG_OPTS[req.type].cgi;
				}

				// 
				// expose_php off remove the powered by message
				// php-cgi -d expose_php=off index.php
				// 
				// Quiet mode avoids powered by and content type output
				// if (LANG_OPTS[req.type].cgi === "php-cgi") {
				// 	executable = executable + " -q ";
				// }
				// 

				proc = child.spawn(executable, [...utils.convert.array(exeOptions.cmd_options), req.file], {
					cwd: process.cwd(),
					env: env
				});
				proc.stdin.on('error', function (err) {
					reject({
						headers: {},
						statusCode: 500,
						response: "runCGI: error in server during stdin " + err.toString()
					});
				});
				proc.stdout.on('data', function (data) {
					tmp_result += data.toString();
				});
				proc.stderr.on('data', function (data) {
					err += data.toString();
				});
				proc.on('error', function (err) {
					reject({
						headers: {},
						statusCode: 500,
						response: "runCGI: error event " + err.toString()
					});
				});
				proc.on('exit', function () {
					proc.stdin.end();
					let CGIObj = {};
					if (!!err) {
						reject({
							headers: {},
							statusCode: 500,
							response: "runCGI: error in server during exit " + err.toString()
						});
					}
					let lines = tmp_result.split('\r\n');
					if (lines.length) {
						if (req.type == "php") {
							CGIObj = getPHPHtml(lines);
						} else {
							CGIObj = getCGIHtml(lines);
						}
					} else {
						CGIObj["response"] = tmp_result;
					}
					if (!CGIObj.statusCode) {
						CGIObj.statusCode = 200;
					}
					if (!CGIObj.headers) {
						CGIObj.headers = {}; // 200
					}
					resolve(CGIObj);
				});
			} else {
				if (!!exeOptions.sendFile) {
					reject({
						headers: {},
						statusCode: 200,
						response: req.file
					});
				}
				reject({
					headers: {},
					statusCode: 400,
					response: "Access denied or file could not be processed"
				});
			}
		});
	}


	/**
	 * 
	 * serve
	 * 
	 * @param { String } type
	 * 
	 * @param { Object } request
	 * 
	 * @param { Object } exeOptions
	 * 
	 * @returns { Promise }
	 * 
	 */
	function serve(type, request, exeOptions) {
		let promise = new Promise(function (resolve, reject) {
			let pattern, gvars, exe;
			try {
				type = getType(type);
				pattern = getPattern(type);
				gvars = getVars(exeOptions);
				exeOptions = gvars.exeOptions;
			}
			catch (e) {
				reject({
					headers: {},
					response: e.toString() || "Error in Environments or Path",
					statusCode: 500
				});
			}
			if (!LANG_OPTS[type].which) {
				exe = setCGI(type, LANG_OPTS[type].cgi, exeOptions);
			}
			fileExists(type, exeOptions).then(function (f) {
				if (!f) {
					reject({
						headers: {},
						response: "serve: File serve promise error: 1 ",
						statusCode: 500
					});
				}
				runCGI({
					type: type,
					file: f,
					pattern_chk: pattern,
					url: request.url,
					originalUrl: request.originalUrl,
					query: request.query,
					method: request.method,
					body: request.body,
					ip: request.ip,
					headers: request.headers
				}, exeOptions).then(function (r) {
					resolve(r);
				}).catch(function (e) {
					reject(e);
				});
			}).catch(function (e) {
				reject({
					headers: {},
					response: "serve: File serve promise error: 2 " + e.toString(),
					statusCode: 500
				});
			});
		})
		return promise;
	}


	return {
		setter: {
			which: setCGI,
			cgiTypes: setCGITypes
		},
		getter: {
			which: getCGI,
			cgiTypes: getCGITypes,
			vars: getVars,
			env: getEnv
		},
		runCGI: runCGI,
		serve: serve
	}
}


exports.serve = cgiServe;
exports.cgi = execute;
