// License: MIT
// Dynamic CGI serving using dynamic path imports for 
//      CGI supporting executable for Interpreted languages Embedded Distribution
// Contribution: 2018 Ganesh K. Bhat <ganeshsurfs@gmail.com> 
// 


/* eslint no-console: 0 */

var process = require('process');
var URL = require('url');
var child = require('child_process');
var path = require('path');
var fs = require('fs');
var shell = require('shelljs');
const util = require('util');

function cgiServe() {

	function getVars() {

		var PHP_CGI = shell.which('php-cgi');
		var PERL_CGI = shell.which('perl');
		var PYTHON_CGI = shell.which('python');
		var PYTHON3_CGI = (process.platform === "win32") ? shell.which('python') : shell.which('python3');
		var RUBY_CGI = shell.which('ruby');

		var LANG_OPTS = {
			"rb": {
				"cgi": "ruby",
				"which": RUBY_CGI
			},
			"pl": {
				"cgi": "perl",
				"which": PERL_CGI
			},
			"plc": {
				"cgi": "perl",
				"which": PERL_CGI
			},
			"pld": {
				"cgi": "perl",
				"which": PERL_CGI
			},
			"py3": {
				"cgi": "python3",
				"which": PYTHON3_CGI
			},
			"py": {
				"cgi": "python",
				"which": PYTHON_CGI
			},
			"php": {
				"cgi": "php-cgi",
				"which": PHP_CGI
			}
		}

		return {
			PHP_CGI: PHP_CGI,
			PERL_CGI: PERL_CGI,
			PYTHON_CGI: PYTHON_CGI,
			PYTHON3_CGI: PYTHON3_CGI,
			RUBY_CGI: RUBY_CGI,
			LANG_OPTS: LANG_OPTS
		}
	}

	/**
	 *
	 *
	 * @param {*} pathinfo
	 * @param {*} file
	 * @param {*} req
	 * @param {*} url
	 * @returns
	 */
	function getEnv(pathinfo, file, req, url) {

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

			// The full URI of the current request. It is made of the concatenation of SCRIPT_NAME and PATH_INFO (if available.)
			URL: req.url,

			SCRIPT_URL: req.url,

			// The original request URI sent by the client.
			REQUEST_URI: req.url,

			// The method used by the current request; usually set to GET or POST.
			REQUEST_METHOD: req.method,

			// The information which follows the ? character in the requested URL.
			QUERY_STRING: url.query || '',

			// 'multipart/form-data', //'application/x-www-form-urlencoded', //The MIME type of the request body; set only for POST or PUT requests.
			CONTENT_TYPE: req.get('Content-Type') || '',

			// The length in bytes of the request body; set only for POST or PUT requests.
			CONTENT_LENGTH: req.get('Content-Length') || 0,

			// The authentication type if the client has authenticated itself to access the script.
			AUTH_TYPE: '',

			AUTH_USER: '',

			// The name of the user as issued by the client when authenticating itself to access the script.
			REMOTE_USER: '',

			// All HTTP headers sent by the client. Headers are separated by carriage return characters (ASCII 13 - \n) and each header name is prefixed by HTTP_, transformed to upper cases, and - characters it contains are replaced by _ characters.
			ALL_HTTP: Object.keys(req.headers).map(function (x) {
				return 'HTTP_' + x.toUpperCase().replace('-', '_') + ': ' + req.headers[x];
			}).reduce(function (a, b) {
				return a + b + '\n';
			}, ''),

			// All HTTP headers as sent by the client in raw form. No transformation on the header names is applied.
			ALL_RAW: Object.keys(req.headers).map(function (x) {
				return x + ': ' + req.headers[x];
			}).reduce(function (a, b) {
				return a + b + '\n';
			}, ''),

			// The web server's software identity.
			SERVER_SOFTWARE: 'NodeJS',

			// The host name or the IP address of the computer running the web server as given in the requested URL.
			SERVER_NAME: 'localhost',

			// The IP address of the computer running the web server.
			SERVER_ADDR: '127.0.0.1',

			// The port to which the request was sent.
			SERVER_PORT: 8011,

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

			// The numerical identifier of the host which served the request. On Abyss Web Server X1, it is always set to 1 since there is only a single host.
			INSTANCE_ID: '',

			// The virtual path of the deepest alias which contains the request URI. If no alias contains the request URI, the variable is set to /.
			APPL_MD_PATH: '',

			// The real path of the deepest alias which contains the request URI. If no alias contains the request URI, the variable is set to the same value as DOCUMENT_ROOT.
			APPL_PHYSICAL_PATH: '',

			// It is set to true if the current request is a subrequest, i.e. a request not directly invoked by a client. Otherwise, it is set to true. Subrequests are generated by the server for internal processing. XSSI includes for example result in subrequests.
			IS_SUBREQ: '',

			REDIRECT_STATUS: 1
		};

		return env
	}

	/**
	 *
	 *
	 * @param {*} type
	 * @returns
	 */
	function getPattern(type) {

		if (type == "py") {
			return /.*?\.py$/
		} else if (type == "py3") {
			return /.*?\.py$/
		} else if (type == "php") {
			return /.*?\.php$/
		} else if (type == "pl") {
			return /.*?\.pl$/
		} else if (type == "plc") {
			return /.*?\.plc$/
		} else if (type == "pld") {
			return /.*?\.pld$/
		} else if (type == "rb") {
			return /.*?\.rb$/
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

		if (type == "py") {
			return "py"
		} else if (type == "py3") {
			return "py"
		} else if (type == "php") {
			return "php"
		} else if (type == "pl") {
			return "pl"
		} else if (type == "plc") {
			return "plc"
		} else if (type == "pld") {
			return "pld"
		} else if (type == "rb") {
			return "rb"
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
					console.log(err)
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
	 * @param {*} type
	 * @param {*} req_url
	 * @param {*} exe_options.web_files_root
	 * @param {*} callback
	 */
	function fileExists(type, req_url, exe_options, callback) {

		var file = path.join(exe_options.web_files_root, req_url.pathname);

		fs.stat(file, function (err, stat) {
			// File does not exist
			if (err || stat.isDirectory()) {
				if (stat && stat.isDirectory()) {
					file = path.join(file, 'index.' + getType(type));
					console.log("Path created file ", file)
				}
				if (file.includes(process.cwd())) {
					fs.exists(file, function (exists) {
						console.log("Path join", file, exists)
						callback(exists && file);
					});
				} else {
					fs.exists(path.join(process.cwd(), file), function (exists) {
						console.log("No path join", file, exists)
						callback(exists && file);
					});
				}
			}

			// File found
			else {
				callback(file);
			}
		});
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
			pathinfo = url.pathname.substring(i + 4)
		} else {
			pathinfo = url.pathname
		};

		// console.log("runCGI pathinfo", pathinfo)
		// console.log("runCGI req", req)

		let env = getEnv(pathinfo, file, req, url);

		Object.keys(req.headers).map(function (x) {
			return env['HTTP_' + x.toUpperCase().replace('-', '_')] = req.headers[x];
		});

		let pattern_chk = getPattern(type);

		if (!!pattern_chk) {
			if (pattern_chk.test(path.join(process.cwd(), file))) {

				let tmp_result = '', err = '', LANG_OPTS = getVars().LANG_OPTS;
				let proc;

				if (!!exe_options.cgi_bin_path && exe_options.cgi_bin_path !== '') {

					console.log("runCGI cgi_bin Path", exe_options.cgi_bin_path + "/" + LANG_OPTS[type]["cgi"])
					proc = child.spawn(exe_options.cgi_bin_path + "/" + LANG_OPTS[type]["cgi"], [], {
						env: env
					});

				} else {

					if (!LANG_OPTS[type]["which"]) {
						throw new Error('"runCGI cgi executable" cannot be found');
					}

					console.log("runCGI bin Path", LANG_OPTS[type]["cgi"])
					proc = child.spawn(LANG_OPTS[type]["cgi"], [file], {
						env: env
					});

				}

				proc.stdin.on('error', function () {
					console.error("runCGI Error from server")
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
					console.error("runCGI error", err);
				});

				proc.on('exit', function () {

					// extract headers
					proc.stdin.end();

					let lines = tmp_result.split('\r\n');
					let html = '', CGIObj = {};

					if (lines.length) {
						if (type == "php") {

							CGIObj = getPHPHtml(lines, res);
							html = CGIObj["html"]
							res = CGIObj["res"]
						} else {

							CGIObj = getCGIHtml(lines, res);
							html = CGIObj["html"]
							res = CGIObj["res"]
						}
					} else {
						html = tmp_result;
					}

					// console.log('runCGI STATUS: ' + res.statusCode);
					// console.log('runCGI HTML: ' + html);

					if (res.statusCode) {
						res.status(res.statusCode).send(html);
					} else {
						res.send(html);
					}
					res.end();
				});
			} else {
				res.sendFile(file);
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

		return function (req, res, next) {

			// stop stream until child-process is opened
			req.pause();
			var req_url = URL.parse(req.url);

			file = fileExists(type, req_url, exe_options, function (file) {
				if (file) {

					console.log("serve fileExists call", exe_options.cgi_bin_path, file);
					runCGI(req, res, next, req_url, type, file, exe_options);
				} else {

					next();
				}
			})
		};
	}

	return {
		getVars: getVars,
		getEnv: getEnv,
		getPattern: getPattern,
		getType: getType,
		getPHPHtml: getPHPHtml,
		getCGIHtml: getCGIHtml,
		fileExists: fileExists,
		runCGI: runCGI,
		serve: serve
	}

}

exports.serve = cgiServe;
