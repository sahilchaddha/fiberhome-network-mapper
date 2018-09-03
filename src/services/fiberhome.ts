//
//  fiberhome.ts
//  Sahil Chaddha
//
//  Created by Sahil Chaddha on 07/08/2018.
//  Copyright © 2018 Sahil Chaddha. All rights reserved.
//

import apiClient, { HTTPMethod } from "../utilities/apiClient"
const cheerio = require("cheerio")
const cheerioTableparser = require("cheerio-tableparser")
const loginPath: string = "/goform/webLogin"
const getLANClientPath: string = "/internet/dhcp_userlist.asp"
const getWANClientsPath: string = "/wireless/wifimaclist.asp"
const loginCookie: string = "loginName="
const requestCookie: string = "loginName=admin"

export interface ClientsPayload {
    macAddress: string
    ipAddress: string
}

export class FiberHomeNetworkMapper {
    private routerUrl: string
    public constructor(routerUrl) {
        this.routerUrl = routerUrl
    }

    private login() {
        return apiClient.call({
                                method: HTTPMethod.POST,
                                url: this.routerUrl + loginPath,
                                cookies: loginCookie,
                                headers: {
                                    "Referer": this.routerUrl + "/login_inter.asp",
                                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
                                    "Upgrade-Insecure-Requests": 1,
                                    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.84 Safari/537.36",
                                },
                                formData: {
                                    User: "admin",
                                    Passwd: "admin",
                                },
                            })
    }

    public getLANClients(): Promise<ClientsPayload[]> {
        return this.login()
                    .then(() => {
                        return apiClient.call({
                            method: HTTPMethod.GET,
                            url: this.routerUrl + getLANClientPath,
                            cookies: requestCookie,
                        })
                        .then((res) => {
                            const data = cheerio.load(res)
                            cheerioTableparser(data)
                            const parsedData = data(".tabal_bg").parsetable()
                            const macs = parsedData[1]
                            const ips = parsedData[2]
                            const clientList: ClientsPayload[] = []
                            for (var i = 2; i < macs.length; i++) {
                                const newClient: ClientsPayload = {macAddress: macs[i], ipAddress: ips[i]}
                                clientList.push(newClient)
                            }
                            return clientList
                        })
                    })
    }

    public getWANClients(): Promise<ClientsPayload[]> {
        return this.login()
                    .then(() => {
                        return apiClient.call({
                            method: HTTPMethod.GET,
                            url: this.routerUrl + getWANClientsPath,
                            cookies: requestCookie,
                        })
                        .then((res) => {
                            const data = cheerio.load(res)
                            cheerioTableparser(data)
                            const parsedData = data(".tabal_bg").parsetable()
                            const macs = parsedData[2]
                            const ips = parsedData[3]
                            const clientList: ClientsPayload[] = []
                            for (var i = 2; i < macs.length; i++) {
                                const newClient: ClientsPayload = {macAddress: macs[i], ipAddress: ips[i]}
                                clientList.push(newClient)
                            }
                            return clientList
                        })
                    })
    }
}
