// License: MIT
// Dynamic CGI serving using dynamic path imports for 
//      CGI supporting executable for Interpreted languages Embedded Distribution
// Contribution: 2018 Ganesh K. Bhat <ganeshsurfs@gmail.com> 
// 


/* eslint no-console: 0 */

const process = require('process');
const URL = require('url');
const child = require('child_process');
const path = require('path');
const fs = require('fs');
const shell = require('shelljs');
const util = require('util');

function cgiServe() {

	let ruby = "ruby", perl = "perl", python = "python", php = "php";
	let python3 = ((process.platform === "win32") ? 'python' : 'python3');
	let langOptions = { "name": '', "cgi": '', "which": '', "type": "", "pattern": null };

	// Use addLangOpts(type, options) to add new interpreter options to LANG_OPTS
	let LANG_OPTS = {
		"rb": { "name": ruby, "cgi": ruby, "which": "", "type": "rb", "pattern": /.*?\.rb$/ },
		"pl": { "name": perl, "cgi": perl, "which": "", "type": "pl", "pattern": /.*?\.pl$/ },
		"plc": { "name": perl, "cgi": perl, "which": "", "type": "plc", "pattern": /.*?\.plc$/ },
		"pld": { "name": perl, "cgi": perl, "which": "", "type": "pld", "pattern": /.*?\.pld$/ },
		"py3": { "name": python3, "cgi": python3, "which": "", "type": "py", "pattern": /.*?\.py$/ },
		"py": { "name": python, "cgi": python, "which": "", "type": "py", "pattern": /.*?\.py$/ },
		"php": { "name": php, "cgi": php + "-cgi", "which": "", "type": "php", "pattern": /.*?\.php$/ }
	}

	function error(msg) {
		console.error(msg);
		process.exit();
	}

	function cleanBinPath(fnc, exe_options) {
		if (!!exe_options) {
			if (exe_options.hasOwnProperty("bin")) {
				if (typeof exe_options.bin === "string") {
					return exe_options.bin;
				} else if (typeof exe_options.bin === "object") {
					if (!!exe_options.bin.bin_path) {
						if (typeof exe_options.bin.bin_path === "string") {
							return exe_options.bin.bin_path;
						}
					} else if (exe_options.bin.bin_path === "") {
						return exe_options.bin.bin_path;
					} else {
						if (!!exe_options.bin.useDefault) {
							return "";
						} else {
							error("cleanBinPath: bin path config type definition error");
						}
					}
				} else {
					error("cleanBinPath: bin config type definition error");
				}
			}
		}
	}

	function setScript(type, options) {
		let keys = langOptions.keys();
		let types = LANG_OPTS.keys();
		for (let j = 0; j < types.length; j++) {
			for (let i = 0; i < keys.length; i++) {
				if (type !== types[j]) {
					LANG_OPTS[type] = {};
					LANG_OPTS[type][keys[i]] = options[keys[i]] ? options[keys[i]] : '';
				}
			}
		}
	}

	function getScript(scripts) {

	}

	function setCGI(cgi_executable, exe_options, type) {
		let WHICH_CGI;
		let cgi_bin_path = cleanBinPath("setCGI", exe_options);
		console.log(cgi_bin_path);
		try {
			WHICH_CGI = shell.which(cgi_bin_path + cgi_executable);
			// Apply CGI to LANG_OPTS
			if (!!LANG_OPTS[type]) {
				LANG_OPTS[type] = WHICH_CGI;
			} else {
				console.error("setCGI: CGI Executable type apply error");
				return false;
			}
		} catch (e) {
			console.error("setCGI: CGI Executable fetch error");
			return false;
		}
		return true;
	}

	function getCGI(cgi_executable, exe_options) {
		let WHICH_CGI;
		let cgi_bin_path = cleanBinPath("getCGI", exe_options);

		try {
			WHICH_CGI = shell.which(cgi_bin_path + cgi_executable);
		} catch (e) {
			console.error("getCGI: CGI Executable fetch error");
			return false;
		}
		return WHICH_CGI;
	}

	function getCGIExe(cgiExe, exe_options) {
		return getCGI(cgiExe, exe_options);
	}

	function setAllCGITypes() {
		// LANG_OPTS
	}

	function getAllCGITypes() {
		return LANG_OPTS;
	}

	function getCGIType(type, LANG_OPTS) {
		if (!!LANG_OPTS[type]) { return LANG_OPTS[type].cgi; }
		return false;
	}

	function pathClean(type, exe_options) {

		// CGI bin path
		binPath = cleanBinPath("pathClean", exe_options);
		// binPath = exe_options.bin;

		// type of CGI - python, ruby, etc
		let cgiType = getCGIType(type, LANG_OPTS);

		// last index of CGI executable if in the bin path
		let exeIndex = binPath.lastIndexOf(cgiType);

		// last index of / in the bin path to ensure it the folder that ends with /
		let slashIndex = binPath.lastIndexOf("/");

		// length of the path string
		let cgiLen = binPath.length;

		// remove exe from path
		if (exeIndex + cgiType.length === cgiLen) {
			binPath = binPath.substring(0, exeIndex);
		}

		// remove slash if there for cgi path
		if (binPath.length !== 0 && slashIndex === binPath.length - 1) {
			binPath = binPath.substring(0, binPath.length - 1);
		}

		binPath = binPath + '/' + cgiType;
		if (typeof exe_options.bin === "string") {
			exe_options.bin = {};
		}
		exe_options.bin.bin_path = binPath;
		LANG_OPTS[getType(type)]["which"] = cgiType;

		return {
			LANG_OPTS: LANG_OPTS,
			exe_options: exe_options
		};
	}

	function getVars(type, exe_options) {
		return pathClean(type, exe_options);
	}

	/**
	 *
	 *
	 * @param {*} pathinfo
	 * @param {*} file
	 * @param {*} req
	 * @param {*} url
	 * @param {*} host
	 * @param {*} port
	 * @returns
	 */
	function getEnv(pathinfo, file, req, url, host, port) {

		var env = {
			SERVER_SIGNATURE: 'NodeJS server at localhost',

			// The extra path information, as given in the requested URL. In fact, scripts can be accessed by their virtual path, followed by extra information at the end of this path. The extra information is sent in PATH_INFO.
			PATH_INFO: pathinfo,

			// The virtual-to-real mapped version of PATH_INFO.
			PATH_TRANSLATED: '',

			// The virtual path of the script being executed.
			SCRIPT_NAME: url.pathname,

			SCRIPT_FILENAME: file,

			// The real path of the script being executed.
			REQUEST_FILENAME: file,

			// The full URL to the current object requested by the client.
			SCRIPT_URI: req.url,

			// The full URI of the current request. It is made of the 
			// 			concatenation of SCRIPT_NAME and PATH_INFO (if available.)
			URL: req.url,

			SCRIPT_URL: req.url,

			// The original request URI sent by the client.
			REQUEST_URI: req.url,

			// The method used by the current request; usually set to GET or POST.
			REQUEST_METHOD: req.method,

			// The information which follows the ? character in the requested URL.
			QUERY_STRING: url.query || '',

			// 'multipart/form-data', //'application/x-www-form-urlencoded', 
			//The MIME type of the request body; set only for POST or PUT requests.
			CONTENT_TYPE: req.get('Content-Type') || '',

			// The length in bytes of the request body; set only for POST or PUT requests.
			CONTENT_LENGTH: req.get('Content-Length') || 0,

			// The authentication type if the client has authenticated itself to access the script.
			AUTH_TYPE: '',

			AUTH_USER: '',

			// The name of the user as issued by the client when authenticating itself to 
			// 			access the script.
			REMOTE_USER: '',

			// All HTTP headers sent by the client. Headers are separated by carriage return 
			// 		characters (ASCII 13 - \n) and each header name is prefixed by HTTP_, 
			// 		transformed to upper cases, and - characters it contains are replaced by _ characters.
			ALL_HTTP: Object.keys(req.headers).map(function (x) {
				return 'HTTP_' + x.toUpperCase().replace('-', '_') + ': ' + req.headers[x];
			}).reduce(function (a, b) {
				return a + b + '\n';
			}, ''),

			// All HTTP headers as sent by the client in raw form. No transformation 
			// 			on the header names is applied.
			ALL_RAW: Object.keys(req.headers).map(function (x) {
				return x + ': ' + req.headers[x];
			}).reduce(function (a, b) {
				return a + b + '\n';
			}, ''),

			// The web server's software identity.
			SERVER_SOFTWARE: 'NodeJS',

			// The host name or the IP address of the computer running the web server 
			// 			as given in the requested URL.
			SERVER_NAME: 'localhost',

			// The IP address of the computer running the web server.
			SERVER_ADDR: host,

			// The port to which the request was sent.
			SERVER_PORT: port,

			// The CGI Specification version supported by the web server; always set to CGI/1.1.
			GATEWAY_INTERFACE: 'CGI/1.1',

			// The HTTP protocol version used by the current request.
			SERVER_PROTOCOL: '',

			// The IP address of the computer that sent the request.
			REMOTE_ADDR: req.ip || '',

			// The port from which the request was sent.
			REMOTE_PORT: '',

			// The absolute path of the web site files. It has the same value as Documents Path.
			DOCUMENT_ROOT: '',

			// The numerical identifier of the host which served the request. On Abyss Web 
			// 			Server X1, it is always set to 1 since there is only a single host.
			INSTANCE_ID: '',

			// The virtual path of the deepest alias which contains the request URI. If no alias 
			// 			contains the request URI, the variable is set to /.
			APPL_MD_PATH: '',

			// The real path of the deepest alias which contains the request URI. If no alias 
			// 			contains the request URI, the variable is set to the same value as DOCUMENT_ROOT.
			APPL_PHYSICAL_PATH: '',

			// It is set to true if the current request is a subrequest, i.e. a request not 
			// 			directly invoked by a client. Otherwise, it is set to true. Subrequests 
			// 			are generated by the server for internal processing. XSSI includes for 
			// 			example result in subrequests.
			IS_SUBREQ: '',

			REDIRECT_STATUS: 1
		};

		return env;
	}

	/**
	 *
	 *
	 * @param {*} type
	 * @returns
	 */
	function getPattern(type) {
		if (!!LANG_OPTS[type] && !!LANG_OPTS[type].pattern) {
			return LANG_OPTS[type].pattern;
		}
		return false;
	}

	/**
	 *
	 *
	 * @param {*} type
	 * @returns
	 */
	function getType(type) {
		if (!!LANG_OPTS[type] && !!LANG_OPTS[type].type) {
			return LANG_OPTS[type].type;
		}
		return false;
	}

	/**
	 *
	 *
	 * @param {*} lines
	 * @param {*} res
	 * @returns
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
	 * @param {*} lines
	 * @param {*} res
	 * @returns
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
					console.error(err)
				}
			}
		}

		html = lines.join('\n')

		return {
			html: html,
			res: res
		};
	}

	function fileExists(type, req_url, exe_options) {
		let promise = new Promise(function (resolve, reject) {

			let feFn = function (f) {
				if (!!f) {
					resolve(f);
				} else {
					resolve(false);
				}
			}

			let file = path.join(exe_options.web_root_folder, req_url.pathname);
			// console.log("Path fileExists", file);
			fs.stat(file, function (err, stat) {
				// File does not exist
				if (err || stat.isDirectory()) {
					if (stat && stat.isDirectory()) {
						file = path.join(file, 'index.' + getType(type));
						console.log("fileExists: Path created file ", file)
					}
					if (file.includes(process.cwd())) {
						fs.exists(file, function (exists) {
							console.log("fileExists: Path join", file, exists)
							if (!!exists) {
								feFn(file);
							}
						});
					} else {
						fs.exists(path.join(process.cwd(), file), function (exists) {
							console.log("fileExists: No path join", file, exists)
							if (!!exists) {
								feFn(file);
							}
						});
					}
				}

				// File found
				else {
					console.log("fileExists: Else Path", file);
					callback(file);
				}
			});
		});
		return promise;
	}

	/**
	 *
	 *
	 * @param {*} req
	 * @param {*} res
	 * @param {*} next
	 * @param {*} url
	 * @param {*} type
	 * @param {*} file
	 * @param {*} exe_options
	 */
	function runCGI(req, res, next, url, type, file, exe_options) {

		let pathinfo = '';
		let i = req.url.indexOf('.' + getType(type));

		if (i > 0) {
			pathinfo = url.pathname.substring(i + 4);
		} else {
			pathinfo = url.pathname;
		};

		// console.log("runCGI pathinfo", pathinfo, file, url.pathname);
		// console.log("runCGI req", req)

		let env = getEnv(pathinfo, file, req, url.pathname, exe_options.host, exe_options.port);

		Object.keys(req.headers).map(function (x) {
			return env['HTTP_' + x.toUpperCase().replace('-', '_')] = req.headers[x];
		});

		let pattern_chk = getPattern(type);
		if (!!pattern_chk) {
			if (!!pattern_chk.test(path.join(process.cwd(), file))) {
				let tmp_result = '', err = '';
				let gvars = getVars(type, exe_options);
				exe_options = gvars.exe_options;
				LANG_OPTS = gvars.LANG_OPTS;
				let proc;
				// console.log("runCGI: exe_options.bin, exe_options.bin.bin_path", exe_options.bin, exe_options.bin.bin_path);

				if (
					(!!exe_options.bin.bin_path) &&
					(('/' + LANG_OPTS[getType(type)].cgi).length !== exe_options.bin.bin_path.length)
				) {
					console.log('runCGI: 1', exe_options.bin.bin_path);
					proc = child.spawn(exe_options.bin.bin_path, [file], {
						env: env
					});
				} else {
					if (!LANG_OPTS[type]["which"]) {
						console.error('which" Error');
						throw new Error('"runCGI: cgi executable" cannot be found');
					}
					console.log('runCGI: 2', exe_options.bin.bin_path.split('/')[1]);
					proc = child.spawn(exe_options.bin.bin_path.split('/')[1], [file], {
						env: env
					});
				}

				proc.stdin.on('error', function () {
					console.error("runCGI: Error from server");
				});

				// Pipe request stream directly into the php process
				req.pipe(proc.stdin);
				req.resume();

				proc.stdout.on('data', function (data) {
					tmp_result += data.toString();
				});

				proc.stderr.on('data', function (data) {
					err += data.toString();
				});

				proc.on('error', function (err) {
					console.error("runCGI: error event", err);
				});

				proc.on('exit', function () {
					// extract headers
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
					// console.log('runCGI STATUS: ' + res.statusCode);
					// console.log('runCGI HTML: ' + html);
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
	}

	/**
	 *
	 *
	 * @param {*} type
	 * @param {*} exe_options
	 * @returns
	 */
	function serve(type, exe_options) {
		// console.log(exe_options.bin.bin_path, exe_options.bin.useDefault);
		return function (req, res, next) {
			// stop stream until child-process is opened
			req.pause();

			var req_url = URL.parse(req.url);
			// req_url = req_url.path;

			fileExists(type, req_url, exe_options).then(function (file) {
				if (!!file) {
					runCGI(req, res, next, req_url, type, file, exe_options);
				} else {
					res.end("serve: File serve exists error: 1");
				}
			}).catch(function (e) {
				res.end("serve: File serve promise error: 2");
			});
		};
	}

	return {
		setter: {
			script: setScript,
			allScripts: setAllCGITypes,
		},
		getter: {
			script: getScript,
			allScripts: getAllCGITypes,
			cgi: getCGI,
			vars: getVars,
			env: getEnv
		},
		fileExists: fileExists,
		runCGI: runCGI,
		serve: serve
	}

}

exports.serve = cgiServe;
