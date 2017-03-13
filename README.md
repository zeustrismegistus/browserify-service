# Browserify Service - provides a service to generate browserified packages and output the generated code as text

Does some lunchbox shell work to create a node package with the specified modules required, run browserify and spit the results back out.
Is synchronous because slack.

	sample usage:
	
		var service = require("d__browserify-service")(/*optional*/ tempPath);
		var jsCode = service.require(['moduleA', 'moduleB', 'moduleC']);
		
	