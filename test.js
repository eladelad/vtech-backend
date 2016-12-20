/**
 * Created by elad on 20/12/2016.
 */
var hosts = [];
var json = [ { host: '1', key: 'HostName', value: '' },
    { host: '1', key: 'Active', value: 'false' },
    { host: '1', key: 'MACAddress', value: '5c:26:0a:5e:b1:8a' },
    { host: '1', key: 'IPAddress', value: '' },
    { host: '2', key: 'HostName', value: '' },
    { host: '2', key: 'Active', value: 'false' },
    { host: '2', key: 'MACAddress', value: '68:5b:35:88:7c:d2' },
    { host: '2', key: 'IPAddress', value: '' },
    { host: '3', key: 'HostName', value: '' },
    { host: '3', key: 'Active', value: 'false' },
    { host: '3', key: 'MACAddress', value: '00:1c:42:13:2f:fb' },
    { host: '3', key: 'IPAddress', value: '' },
    { host: '4', key: 'HostName', value: 'OpenELEC' },
    { host: '4', key: 'Active', value: 'true' },
    { host: '4', key: 'MACAddress', value: 'd0:63:b4:00:7a:f7' },
    { host: '4', key: 'IPAddress', value: '192.168.14.40' },
    { host: '5', key: 'HostName', value: 'elads-MBP' },
    { host: '5', key: 'Active', value: 'false' },
    { host: '5', key: 'MACAddress', value: '98:5a:eb:ca:64:d0' },
    { host: '5', key: 'IPAddress', value: '192.168.14.176' },
    { host: '6', key: 'HostName', value: 'elads-MBP' },
    { host: '6', key: 'Active', value: 'true' },
    { host: '6', key: 'MACAddress', value: 'ac:bc:32:a7:18:35' },
    { host: '6', key: 'IPAddress', value: '192.168.14.108' },
    { host: '7', key: 'HostName', value: 'Zzzz' },
    { host: '7', key: 'Active', value: 'true' },
    { host: '7', key: 'MACAddress', value: 'e0:b5:2d:18:d0:84' },
    { host: '7', key: 'IPAddress', value: '192.168.14.142' },
    { host: '8', key: 'HostName', value: 'mokojo' },
    { host: '8', key: 'Active', value: 'false' },
    { host: '8', key: 'MACAddress', value: 'a0:88:b4:bf:37:f4' },
    { host: '8', key: 'IPAddress', value: '192.168.14.53' },
    { host: '9', key: 'HostName', value: 'android-a5ee1686fa95706c' },
    { host: '9', key: 'Active', value: 'false' },
    { host: '9', key: 'MACAddress', value: '90:b6:86:cb:e2:69' },
    { host: '9', key: 'IPAddress', value: '192.168.14.63' } ];

console.log(json.length);
for (var i = 0; i < json.length; i++) {
    if(!hosts[parseInt(json[i]['host'])-1]){
        hosts[parseInt(json[i]['host'])-1] = {}
    }
    hosts[parseInt(json[i]['host'])-1][json[i]['key']] = json[i]['value']
}
console.log(hosts);