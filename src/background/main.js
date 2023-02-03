import axios from "axios";
import * as API from "../constants/ApiRef";
import fetchAdapter from "@vespaiach/axios-fetch-adapter";
import {CLASS_TABLE} from "../constants/ClassTable";

let ratingByClass = {};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    let payload = []
    if (request.type === 'load-for-class') {
        request.message.forEach(function (message, index) {
            if (CLASS_TABLE[message]) {
                payload.push({
                    id: index + 1, jsonrpc: "2.0", method: "avatarRating_getRatingByClass", params: {
                        class: CLASS_TABLE[message].toString()
                    }
                })
            }
        });
        axios.request({
            method: 'post', url: API.RATING, adapter: fetchAdapter, data: payload
        }).then(response => {
            response.data.forEach(function (classRating) {
                ratingByClass[request.message[classRating.id - 1]] = classRating.result;
            })
            sendResponse(ratingByClass);
        }).catch(error => console.error(error))
    } else if (request.type === 'load-character-info') {
        axios.request({
            method: 'get', url: API.ARMORY_URL + request.name, adapter: fetchAdapter
        }).then(response => {
            let gscore = response.data
                .split('<span>Максимальный рейтинг</span><span><small>Ур.</small>')[1]
                .split('</small></span></div>')[0]
                .replace('<small>', '')
                .replace(',', '')
                .replace('.00', '');
            sendResponse({
                name: request.name,
                gs: gscore
            });
        }).catch(error => console.error(error))
    }
    return true;
});
