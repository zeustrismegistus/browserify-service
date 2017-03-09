//init dependencies
const moduleBuilder = require('d__module-builder').ModuleBuilder;
const fs = require('fs-extra');
const path = require('path');
const shell = require('shelljs');

/*
	sample usage:
	
		var service = require("d__browserify-service");
		
		var jsCode = service.require(['moduleA', 'moduleB', 'moduleC');
*/

function browserifyService ()
{
	//privates
	var __self = this;
	var __tempFolderRoot = './temp';
	
	//behaviour
	this.require = function(/*expects array*/ modules)
	{
		var nowSecs = new Date().getTime();
		var tempFolder = path.join(__tempFolderRoot, nowSecs);
		var builder = moduleBuilder(tempFolder);
	
		try
		{ 
			console.log('browserifyService building requires for ' + modules.join(',') + ' at ' + tempFolder);
			
			builder.initFolder();
			builder.setName("temp" + nowSecs);

			//create a main program that requires all the modules
			string mainjs = "";
			
			modules.forEach((x,i,a)=>
			{ 
				builder.hasDependency(x); 
				mainjs += 'var ' + x + ' = require(' + x + ');\r\n';
			});
			builder.hasDependency('browserify');
			builder.npmUpdate(); //grab the modules
			builder.hasFile('main.js', mainjs);
			
			builder.shell('browserify main.js -o bundle.js');
			
			//read bundle.js
			var rv = fs.readFileSync(path.resolve(tempFolder,'bundle.js'));
			
			return rv;
		}
		catch(e)
		{
			console.log(e);
			throw e;
		}
		finally
		{
			builder.removeFolder(); //clean up the temp environment
			console.log('browserifyService completed building requires for ' + modules.join(',') + ' at ' + tempFolder);
		}
	};
}

(()=>{
	Object.freeze(browserifyService);
})();


module.exports = browserifyService;

