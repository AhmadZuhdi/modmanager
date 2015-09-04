var fs = require('fs-extra');
var path = require('path');
var _ = require('underscore');
var cli = require('minimist');
var async = require('async');
var color = require('colors');
var dirs = require('node-dir');
var helper = require('./../helper');
var app = app || {};

app.init = function(workingDir)
{
	if(!workingDir)
	{
		workingDir = process.cwd();
	}

	fs.exists(workingDir + '/modmanager.json', function(exists)
	{
		if(!exists)
		{
			fs.writeJsonSync(workingDir + '/modmanager.json', {installed:[]});
		}
	})

	return true;
}

app.getInfo = function()
{
	var workingDir = process.cwd();

	var exists = fs.existsSync(workingDir + '/modmanager.json');

	if(!exists)
	{	
		return false;
	}

	var conf = fs.readJsonSync(workingDir + '/modmanager.json');

	if(!conf)
	{
		return false;
	}

	return conf;
}

app.searchMod = function(query)
{
	var result = [];
	
	mods = helper.getMods();

	if(query == '*')
	{
		result = fs.readdirSync(__dirname + '/../mods');

	} else {

		_.each(mods, function(value, key)
		{
			var re = new RegExp(query.toLowerCase());

			var match = value.toLowerCase().match(re);

			if(match)
			{
				result.push(value);
			}
		})
	}

	return result;
}

module.exports = app;