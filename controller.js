'use strict'
const fetch = require('cross-fetch');
const _ = require('lodash');

exports.hello = (req, res) => {

    console.log("im here", req.query);
    res.send('Hey this is a test module designed by Manish!');

}

exports.findServer = async function (req, res) {
    console.log("im here", req.body, typeof req.body);
    let postData = req.body;
    let tasks = await postData.map(async (urlInfo) => {
        urlInfo = await parallelServer(urlInfo);
        console.log(urlInfo);
        return urlInfo;
    });
    let result = await Promise.allSettled(tasks);
    // console.log(result);
    result = _.filter(result, { 'status': 'fulfilled' });
    let finalResponse;
    if (result.length > 0) {
        result = _.map(result, 'value');
        result = _.sortBy(result, ['priority']);
        finalResponse = {
            data: result[0],
            message: "",
            response_code: 200,
            service_name: "findServer"
        };
    } else {
        finalResponse = {
            data: null,
            message: "No server online",
            response_code: 404,
            service_name: "findServer"
        };
    }
    res.send(finalResponse);
}

let parallelServer = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let controller = new AbortController();
            const timeoutId = setTimeout(() => {
                controller.abort()
            }, 5000);
            let response = await fetch(data.url, { signal: controller.signal })

            clearTimeout(timeoutId);
            console.log(response.status);
            if (response.status >= 200 && response.status <= 299) {
                data['status'] = 'online';
                resolve(data);
            } else {
                data['status'] = 'offline';
                reject(data);
            }
        } catch (EX) {
            // console.log(EX);
            data['status'] = 'offline';
            reject(data);
        }
    })
}