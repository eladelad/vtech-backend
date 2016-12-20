/**
 * Created by elad on 20/12/2016.
 */
var express = require('express');
var router = express.Router();
var Promise = require('promise');
var Q = require("q");

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    var soap = require('soap');
    var url = process.env.TR_URL;
    var ip = req.query.ip;
    soap.createClient(url, function(err, client) {
        getDeviceSnByIP(client, ip)
            .then(function (devicesn) { return getHostsCount(client, devicesn)})
            .then(function(result){ return getAllHosts(client, result.devicesn, result.hosts_count) })
            .then(function(result){return res.json(result)})
    });
});


var getHostsCount = function (client, devicesn) {
    return new Promise(function(resolve, reject){
        var args = {
            devicesn: devicesn,
            source: 0,
            arraynames: { string: ['InternetGatewayDevice.LANDevice.1.Hosts.HostNumberOfEntries'] }
        };
        client.FTGetDeviceParameters(args, function(err, result){
            result = {devicesn: devicesn, hosts_count: result.FTGetDeviceParametersResult.Params.ParamWSDL[0].Value}
            console.log('resolving host count', result);
            resolve(result);
        })
    })
};


var getDeviceSnByIP = function(client, ip){
    return new Promise(function(resolve, reject){
        var args = {ip: ip};
        client.FTGetCPEByIP(args, function(err, result) {
            if (err){ reject(err)}
            devicesn = result.FTGetCPEByIPResult.Serial;
            console.log('resolving devicesn', devicesn);
            resolve(devicesn);
        })
    })
};

var getAllHosts = function (client, devicesn, hosts_count) {
    return new Promise(function(resolve, reject){
        var args = {
            devicesn: devicesn,
            source: 0,
            arraynames: { string: [] }
        };
        for (var i = 0; i < hosts_count; i++) {
            args.arraynames.string.push('InternetGatewayDevice.LANDevice.1.Hosts.Host.' + (i+1) + '.HostName');
            args.arraynames.string.push('InternetGatewayDevice.LANDevice.1.Hosts.Host.' + (i+1) + '.Active');
            args.arraynames.string.push('InternetGatewayDevice.LANDevice.1.Hosts.Host.' + (i+1) + '.MACAddress');
            args.arraynames.string.push('InternetGatewayDevice.LANDevice.1.Hosts.Host.' + (i+1) + '.IPAddress');
        }
        client.FTGetDeviceParameters(args, function(err, result) {
            if (err) { reject(err) }
            resolve(makeHostsJson(result));
        })
    })
};

var makeHostsJson = function(params_json, hosts_count){
    var hosts = [];
    var key_value = params_json.FTGetDeviceParametersResult.Params.ParamWSDL.map(function(h) {
        var host = h.Name.split(".")[5];
        var key = h.Name.split(".")[6];
        var value = h.Value;
        return {host: host, key: key, value: value}
    });
    for (var i = 0; i < key_value.length; i++) {
        if(!hosts[parseInt(key_value[i]['host'])]){
            hosts[parseInt(key_value[i]['host'])] = {}
        }
        hosts[parseInt(key_value[i]['host'])][key_value[i]['key']] = key_value[i]['value']
    }
    hosts.splice(0,1);
    console.log(hosts);
    return hosts;
};

module.exports = router;
