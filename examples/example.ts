/*tslint:disable:no-console*/

import { FiberHomeNetworkMapper, ClientsPayload } from "../src/index"

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
