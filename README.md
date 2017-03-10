# Browserify Service - provides a service to generate browserified packages and output the generated code as text

	sample usage:
	
		var service = require("d__browserify-service")(/*optional*/ tempPath);
		var jsCode = service.require(['moduleA', 'moduleB', 'moduleC']);
		
	