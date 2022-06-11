export { cgiServe as serve };
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
declare function cgiServe(): any;
