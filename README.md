# fiberhome-network-mapper

Network Mapper for FiberHome Routers.

Due to lack of DHCP Reservation / Static IP Reservation & enforced AP Isolation, this library will return all connected clients with their ip and mac address. This information then can be mapped to dynamic DNS to update IP Addresses for Homebridge/LAN.

## Installtion : 

```shell
    $ npm install fiberhome-network-mapper
```

## Usage : 

```js
import { FiberHomeNetworkMapper, ClientsPayload } from "fiberhome-network-mapper"

const mapper = new FiberHomeNetworkMapper("http://192.168.1.1")

mapper.getLANClients()
.then((res) => {
    console.log(" ** LAN CLIENTS ** ")
    console.log(res)
})

mapper.getWANClients()
.then((res) => {
    console.log(" ** WAN CLIENTS ** ")
    console.log(res)
})

```

## Running Example : 

```shell
    $ npm run example
```

## Lint : 

```shell
    $ npm run lint
```

## Results : 
```
 ** LAN CLIENTS **
[ { macAddress: 'XX:XX:XX:XX:XX:XX', ipAddress: '192.168.1.29' },
  { macAddress: 'XX:XX:XX:XX:XX:XX', ipAddress: '192.168.1.34' },
  { macAddress: 'XX:XX:XX:XX:XX:XX', ipAddress: '192.168.1.88' },
  { macAddress: 'XX:XX:XX:XX:XX:XX', ipAddress: '192.168.1.86' },
  { macAddress: 'XX:XX:XX:XX:XX:XX', ipAddress: '192.168.1.87' } ]
 ** WAN CLIENTS **
[ { macAddress: 'XX:XX:XX:XX:XX:XX', ipAddress: '192.168.1.2' },
  { macAddress: 'XX:XX:XX:XX:XX:XX', ipAddress: '192.168.1.6' },
  { macAddress: 'XX:XX:XX:XX:XX:XX', ipAddress: '192.168.1.8' },
  { macAddress: 'XX:XX:XX:XX:XX:XX', ipAddress: '192.168.1.5' },
  { macAddress: 'XX:XX:XX:XX:XX:XX', ipAddress: '192.168.1.18' } ]
```