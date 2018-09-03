//
//  apiClient.ts
//  Sahil Chaddha
//
//  Created by Sahil Chaddha on 07/08/2018.
//  Copyright © 2018 Sahil Chaddha. All rights reserved.
//

import * as Request from "request"
export enum HTTPMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
}

interface APIClientParams {
    method: HTTPMethod
    url: string
    data?: any
    headers?: Request.Headers
    cookies?: string
    formData?: any
}

class APIClient {
    public call(params: APIClientParams): Promise<any> {
        return new Promise((resolve, reject) => {
            const options: Request.CoreOptions = {
                method: params.method,
                headers: params.headers,
            }

            if (options.headers == null) {
                options.headers = {}
            }

            if (params.data != null) {
                options.json = true
                options.body = params.data
            }

            if (params.formData != null) {
                options.form = params.formData
            }

            if (params.cookies != null) {
                options.headers["Cookie"] = params.cookies
            }
            Request(params.url, options, (error, response, body) => {
                if (error != null) {
                    return reject(error)
                }
                return resolve(body)
            })
        })
    }
}

export default new APIClient()
