var fs = require('fs-extra');
var _ = require('underscore');

var helper = helper || {};

helper.getMods = function()
{
	var dirs = fs.readdirSync(__dirname + '/mods')

	return dirs;
}

helper.dirRecursive = function(dir, done)
{
	var results = [];

	var results = [];
  	fs.readdir(dir, function(err, list) 
  	{
	    if (err) return done(err);
	    
	    var i = 0;
	    
	    (function next() 
	    {
	      	var file = list[i++];

	      	if (!file) return done(null, results);

	      	file = dir + '/' + file;

	      	fs.stat(file, function(err, stat) 
	      	{
	      		results.push(file);
	      		
	        	if (stat && stat.isDirectory()) 
	        	{
	          		helper.dirRecursive(file, function(err, res) 
	          		{
	            		results = results.concat(res);
	            		next();
	          		});

	        	} else {

	          		next();
	        	}
	      	});

    	})();

  	});
}

module.exports = helper;