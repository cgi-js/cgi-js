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
const child = require('child_process');
const path = require('path');
const fs = require('fs');
const shell = require('shelljs');
const { request } = require('http');
const { json } = require('express');
const utils = require('./utils')();
const setter = utils.setter, getter = utils.getter;


// function handler() {

// 	TODO: NEXT VERSION
// 	Move to exec/spawn/fork/execFile based simpler - easier - smaller implementation

// 	let langOptions = { "name": '', "cgi": '', "which": '', "type": "", "pattern": null };
// 	let LANG_OPTS = {
// 		"rb": { "name": "ruby", "cgi": "ruby", "which": "", "type": "rb", "pattern": /.*?\.rb$/ },
// 		"pl": { "name": "perl", "cgi": "perl", "which": "", "type": "pl", "pattern": /.*?\.pl$/ },
// 		"plc": { "name": "perl", "cgi": "perl", "which": "", "type": "plc", "pattern": /.*?\.plc$/ },
// 		"pld": { "name": "perl", "cgi": "perl", "which": "", "type": "pld", "pattern": /.*?\.pld$/ },
// 		"py3": { "name": "python3", "cgi": ((process.platform === "win32") ? 'python' : 'python3'), "which": "", "type": "py", "pattern": /.*?\.py$/ },
// 		"py": { "name": "python", "cgi": "python", "which": "", "type": "py", "pattern": /.*?\.py$/ },
// 		"php": { "name": "php", "cgi": "php" + "-cgi", "which": "", "type": "php", "pattern": /.*?\.php$/ },
// 		"node": { "name": "node", "cgi": "node", "which": "", "type": "node", "pattern": /.*?\.js$/ }
// 	}

	// function getEnvironment(){}
	// function getVariables(){}
	// function getBinPath(){}
	// function getType(){}
	// function getFilePattern(){}

	// function getCGIType(){}
	// function setCGIType(){}
	// function setCGI(){}
	// function getCGI(){}

	// function validateObject(){}
	// function validateCGI(){}
	// function validFile(){} // fileExists

	// function runCGI(){}
	// function serve(){}

// 	return {}
// }


/**
 * cgiServe
 * CGI File Handler
 * 
 * 
 * @returns {Object} CGI Serve File module functions
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
	 * @param {String} action
	 * 
	 * @param {Object} exeOptions
	 * 
	 * @returns {string} bin_path / {throw error} 
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
				return utils.error("getBinPath: bin path config type definition error", false);
			}
		}
	}

	/**
	 * 
	 * validateLangOptionStructure
	 * 
	 * @param  {Object} obj
	 * 
	 * @returns {Boolean} validated
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
	 * @param {String} cgiExecutable
	 * 
	 * @param {Object} exeOptions
	 * 
	 * @param {String} type
	 * 
	 * @returns {Boolean} set? / {throw error}
	 * 
	 */

	function setCGI(type, cgiExecutable, exeOptions) {
		try {
			let WHICH_CGI = shell.which(path.join(exeOptions.bin.bin_path, cgiExecutable));
			if (!!LANG_OPTS[type]) {
				LANG_OPTS[type].which = WHICH_CGI;
				return true;
			} else {
				return utils.error("setCGI: CGI Executable type apply error", false);
			}
		} catch (e) {
			return utils.error("setCGI: CGI Executable fetch error", false);
		}
	}

	/**
	 *
	 * getCGI
	 * 
	 * @param {String} type
	 * 
	 * @param {Object} exeOptions
	 * 
	 * @returns {String} WHICH_CGI
	 * 
	 */

	function getCGI(type, exeOptions) {
		try {
			if (!LANG_OPTS[type].which) {
				let cgiset = setCGI(type, LANG_OPTS[type], exeOptions);
			}
			return LANG_OPTS[type].which;
		} catch (e) {
			return utils.error("getCGI: CGI Executable fetch error " + e.toString(), false);
		}
	}

	/**
	 *
	 * setCGITypes
	 * 
	 * @param {String} cgiLang
	 * 
	 * @returns {Boolean} / {throw error}
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
		return utils.error("setCGITypes: Incorrect Type provided", false);
	}

	/**
	 *
	 * getCGITypes
	 * 
	 * @param {String, Array} cgiLang
	 * 
	 * @returns {Object} LANG_OPTS / {string} LANG_OPTS[type]
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
	 * @param {Object} exeOptions
	 * 
	 * @returns {Object} {LANG_OPTS, exeOptions}
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
	 * @param {String} type
	 * 
	 * @param {Object} exeOptions
	 * 
	 * @returns {Object} {LANG_OPTS, exeOptions}
	 * 
	 */
	function getVars(exeOptions) {
		return cleanPath(exeOptions);
	}

	/**
	 *
	 * getEnv
	 * 
	 * @param {Object} req
	 * 
	 * @param {String} host
	 * 
	 * @param {Number} port
	 * 
	 * @returns {Object} env(environment)
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
	 * @param {String} type
	 * 
	 * @returns {^regex pattern} pattern / {throw error}
	 * 
	 */
	function getPattern(type) {
		let ty = LANG_OPTS[type];
		if (!!ty && !!ty.pattern && ty.pattern !== "") {
			return ty.pattern;
		}
		return utils.error("getPattern: Pattern does not exist " + pattern.toString(), false);
	}

	/**
	 *
	 * getType
	 * 
	 * @param {String} type
	 * 
	 * @returns {String} type / {throw error}
	 * 
	 */
	function getType(type) {
		let ty = LANG_OPTS[type];
		if (!!ty && !!ty.type && ty.type !== "") {
			return ty.type;
		}
		return utils.error("getType: Type does not exist " + type.toString(), false);
	}

	/**
	 *
	 * getPHPHtml
	 * 
	 * @param {Array} lines
	 * 
	 * @returns {Object} {html}
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
	 * @param {String} lines
	 * 
	 * @returns {Object} {html, res}
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
					return utils.error(err.toString(), false);
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
	 * @param {String} type
	 * 
	 * @param {Object} exeOptions
	 * 
	 * @returns {Object promise} resolve(file/bool)
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
	 * @param {Object req} req
	 * 
	 * @param {Object} exeOptions
	 * 
	 * @returns
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
							utils.error('"runCGI: cgi executable" cannot be found, "which" Error ', false)
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
	 * @param {String} type
	 * 
	 * @param {Object} request
	 * 
	 * @param {Object} exeOptions
	 * 
	 * @returns
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
