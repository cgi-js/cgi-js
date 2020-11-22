/* eslint no-console: 0 */
const process = require('process');
const URL = require('url');
const child = require('child_process');
const path = require('path');
const fs = require('fs');
const shell = require('shelljs');
const utils = require('./utils')();
/**
 *
 *
 * @returns {Object}
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
	 *
	 * @param {string} msg
	 * @return {throw error}
	 */
	function error(msg) {
		console.error(msg);
		process.exit(msg);
	}

	/**
	 *
	 *
	 * @param {string} action
	 * @param {Object} exeOptions
	 * @returns {string} bin_path / {throw error} 
	 */
	function cleanBinPath(action, exeOptions) {
		if (typeof exeOptions.bin === "string") {
			return exeOptions.bin;
		} else if (typeof exeOptions.bin === "object") {
			if (!!exeOptions.bin.useDefault) {
				return "";
			} else if (!!exeOptions.bin.bin_path) {
				return exeOptions.bin.bin_path;
			} else {
				error("cleanBinPath: bin path config type definition error");
			}
		}
	}

	/**
	 * @param  {Object} obj
	 * @returns {bool} validated
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
	 * Check this again
	 *
	 * @param {string} cgiExecutable
	 * @param {Object} exeOptions
	 * @param {string} type
	 * @returns {bool} / {throw error}
	 */
	function setCGI(type, cgiExecutable, exeOptions) {
		try {
			let WHICH_CGI = shell.which(path.join(exeOptions.bin.bin_path, cgiExecutable));
			if (!!LANG_OPTS[type]) {
				LANG_OPTS[type].which = WHICH_CGI;
				return true;
			} else {
				error("setCGI: CGI Executable type apply error");
			}
		} catch (e) {
			error("setCGI: CGI Executable fetch error");
		}
	}

	/**
	 *
	 *
	 * @param {string} type
	 * @param {Object} exeOptions
	 * @returns {string} WHICH_CGI
	 */
	function getCGI(type, exeOptions) {
		try {
			if (!LANG_OPTS[type].which) {
				let cgiset = setCGI(type, LANG_OPTS[type], exeOptions);
			}
			return LANG_OPTS[type].which;
		} catch (e) {
			error("getCGI: CGI Executable fetch error " + e.toString());
		}
	}

	/**
	 *
	 *
	 * @param {string} cgiLang
	 * @returns {bool} / {throw error}
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
		error("setCGITypes: Incorrect Type provided");
	}

	/**
	 *
	 * @param {string, array} cgiLang
	 * @returns {Object} LANG_OPTS / {string} LANG_OPTS[type]
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
	 *
	 * @param {string} type
	 * @param {Object} exeOptions
	 * @returns {Object} {LANG_OPTS, exeOptions}
	 */
	function pathClean(exeOptions) {
		exeOptions.bin = { bin_path: cleanBinPath("getCGI", exeOptions) };
		return {
			LANG_OPTS: LANG_OPTS,
			exeOptions: exeOptions
		};
	}

	/**
	 *
	 *
	 * @param {string} type
	 * @param {Object} exeOptions
	 * @returns {Object} {LANG_OPTS, exeOptions}
	 */
	function getVars(exeOptions) {
		return pathClean(exeOptions);
	}

	/**
	 *
	 *
	 * @param {string} pathinfo
	 * @param {string} file
	 * @param {Object request} req
	 * @param {Object url} url
	 * @param {string} host
	 * @param {int} port
	 * @returns {Object} env(environment)
	 */
	function getEnv(pathinfo, file, req, url, host, port) {
		var env = {
			SERVER_SIGNATURE: 'NodeJS server at localhost',
			PATH_INFO: pathinfo,
			PATH_TRANSLATED: '',
			SCRIPT_NAME: url.pathname,
			SCRIPT_FILENAME: file,
			REQUEST_FILENAME: file,
			SCRIPT_URI: req.url,
			URL: req.url,
			SCRIPT_URL: req.url,
			REQUEST_URI: req.url,
			REQUEST_METHOD: req.method,
			QUERY_STRING: url.query || '',
			CONTENT_TYPE: req.get('Content-Type') || '',
			CONTENT_LENGTH: req.get('Content-Length') || 0,
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
	 *
	 * @param {string} type
	 * @returns {^regex pattern} pattern / {throw error}
	 */
	function getPattern(type) {
		let ty = LANG_OPTS[type];
		if (!!ty && !!ty.pattern && ty.pattern !== "") {
			return ty.pattern;
		}
		error("getPattern: Pattern does not exist ", pattern);
	}

	/**
	 *
	 *
	 * @param {string} type
	 * @returns {string} type / {throw error}
	 */
	function getType(type) {
		let ty = LANG_OPTS[type];
		if (!!ty && !!ty.type && ty.type !== "") {
			return ty.type;
		}
		error("getType: Type does not exist ", type);
	}

	/**
	 *
	 *
	 * @param {array} lines
	 * @param {Object} res
	 * @returns {Object} {html, res}
	 */
	function getPHPHtml(lines, res) {
		var line = 0;
		do {
			var m = lines[line].split(': ');
			if (m[0] === '') break;
			if (m[0] == 'Status') {
				res.statusCode = parseInt(m[1]);
			}
			if (m.length == 2) {
				res.setHeader(m[0], m[1]);
			}
			line++;
		} while (lines[line] !== '');
		html = lines.splice(line + 1).join('\n')
		return {
			html: html,
			res: res
		};
	}

	/**
	 *
	 *
	 * @param {string} lines
	 * @param {Object res} res
	 * @returns {Object} {html, res}
	 */
	function getCGIHtml(lines, res) {
		var line = 0;
		for (var i = 0; i < lines.length; i++) {
			if (lines[line] !== '') {
				try {
					var m = lines[line].split(': ');
					if (m[0] === '') break;
					if (m[0] == 'Status') {
						res.statusCode = parseInt(m[1]);
					}
					if (m.length == 2) {
						res.setHeader(m[0], m[1]);
					}
				} catch (err) {
					console.error("getCGIHtml: ", err)
				}
			}
		}
		html = lines.join('\n')
		return {
			html: html,
			res: res
		};
	}

	/**
	 *
	 *
	 * @param {string} type
	 * @param {Object} exeOptions
	 * @returns {Object promise} resolve(file/bool)
	 */
	function fileExists(type, exeOptions) {
		let promise = new Promise(function (resolve, reject) {
			let feFn = function (f) {
				(!!f) ? resolve(f) : resolve(false);
			}
			let file = path.join(exeOptions.web_root_folder);
			fs.stat(file, function (err, stat) {
				if (err || stat.isDirectory()) {
					if (stat && stat.isDirectory()) {
						file = path.join(file, 'index.' + type);
					}
					if (file.includes(process.cwd())) {
						fs.exists(file, function (exists) {
							if (!!exists) {
								feFn(file);
							}
						});
					} else {
						fs.exists(path.join(process.cwd(), file), function (exists) {
							if (!!exists) {
								feFn(file);
							}
						});
					}
				}
				else {
					callback(file);
				}
			});
		});
		return promise;
	}

	/**
	 *
	 *
	 * @param {Object req} req
	 * @param {Object res} res
	 * @param {Object next} next
	 * @param {Object url} url
	 * @param {string} type
	 * @param {string} file
	 * @param {^regex pattern} pattern_chk
	 * @param {Object} exeOptions
	 * @returns
	 */
	function runCGI(req, res, next, url, type, file, pattern_chk, exeOptions) {
		let index = req.originalUrl.indexOf('.' + type);
		let pathinfo = (index >= 0) ? url.pathname.substring(index + type.length + 1) : url.pathname;
		let env = getEnv(pathinfo, file, req, url.pathname, exeOptions.host, exeOptions.port);
		Object.keys(req.headers).map(function (x) {
			return env['HTTP_' + x.toUpperCase().replace('-', '_')] = req.headers[x];
		});
		if (!!pattern_chk.test(path.join(process.cwd(), file))) {
			let tmp_result = '', err = '', proc, executable;
			if ((!!exeOptions.bin.bin_path) && (('/' + LANG_OPTS[type].cgi).length !== exeOptions.bin.bin_path.length)) {
				executable = exeOptions.bin.bin_path + "/" + LANG_OPTS[type].cgi;
			} else {
				if (!LANG_OPTS[type]["which"]) {
					error('"runCGI: cgi executable" cannot be found, "which" Error');
				}
				let p = exeOptions.bin.bin_path.split('/')[1];
				executable = ((!!p) ? p + "/" : "") + LANG_OPTS[type].cgi;
			}
			proc = child.spawn(executable, [...utils.convert.array(exeOptions.cmd_options), file], {
				cwd: process.cwd(),
				env: env
			});
			proc.stdin.on('error', function () {
				error("runCGI: Error from server");
			});
			req.pipe(proc.stdin);
			req.resume();
			proc.stdout.on('data', function (data) {
				tmp_result += data.toString();
			});
			proc.stderr.on('data', function (data) {
				err += data.toString();
			});
			proc.on('error', function (err) {
				if (res.statusCode) {
					return res.status(res.statusCode).send("runCGI: error event" + err.toString());
				} else {
					return res.send(500, "runCGI: error event" + err.toString());
				}
			});
			proc.on('exit', function () {
				proc.stdin.end();
				let lines = tmp_result.split('\r\n');
				let html = '', CGIObj = {};
				if (lines.length) {
					if (type == "php") {
						CGIObj = getPHPHtml(lines, res);
						html = CGIObj["html"];
						res = CGIObj["res"];
					} else {
						CGIObj = getCGIHtml(lines, res);
						html = CGIObj["html"];
						res = CGIObj["res"];
					}
				} else {
					html = tmp_result;
				}
				if (res.statusCode) {
					return res.status(res.statusCode).send(html);
				} else {
					return res.send(html);
				}
				return res.end();
			});
		} else {
			return res.sendFile(file);
		}
	}

	/**
	 *
	 *
	 * @param {string} type
	 * @param {Object} exeOptions
	 * @returns
	 */
	function serve(type, exeOptions) {
		type = getType(type);
		let pattern = getPattern(type);
		let gvars = getVars(exeOptions);
		exeOptions = gvars.exeOptions;
		let exe = setCGI(type, LANG_OPTS[type].cgi, exeOptions);
		if (!exe) {
			error("serve: Exe setCGI failed");
		}
		return function (req, res, next) {
			try {
				req.pause();
				var req_url = URL.parse(req.originalUrl);
				fileExists(type, exeOptions).then(function (file) {
					if (!!file) {
						runCGI(req, res, next, req_url, type, file, pattern, exeOptions);
					} else {
						res.end("serve: File serve exists error: 1");
					}
				}).catch(function (e) {
					res.end("serve: File serve promise error: 2" + e.toString());
				});
			} catch (e) {
				res.end("serve: File serve promise error: 3", e.toString());
			}
		};
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
