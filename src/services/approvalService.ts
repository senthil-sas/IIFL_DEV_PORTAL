import axios from "axios";
import { mainHeader } from "../services/index"

const AXIOS = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});


function getHeaders() {
    return {
        headers: mainHeader(),
    };
}

function getAdminFilterAPI(payload: Object) {
    return AXIOS.post(`v1/portal/admin/get/apps`, payload, getHeaders());
}

// function getAppDetailsAPI(payload: any) {
//     return AXIOS.post(`admin/get/apps/details`, payload, getHeaders());
// }

function getAppApproveReject(payload: any) {
    return AXIOS.post(`v1/portal/admin/approve/app`, payload, getHeaders());
}
function getAppApproveBlock(payload: any) {
    return AXIOS.post(`v1/portal/admin/block/app`, payload, getHeaders());
}
// function getSessionList(payload: any) {
//     return AXIOS.post(`admin/get/adminbased/session`, payload, getHeaders());
// }
// function getSessionRevoke(payload: any) {
//     return AXIOS.post(`admin/revoke/session`, payload, getHeaders());
// }

const service = {
    getAdminFilterAPI,
    // getAppDetailsAPI,
    getAppApproveReject,
    getAppApproveBlock,
    // getSessionList,
    // getSessionRevoke
}
export default service;
