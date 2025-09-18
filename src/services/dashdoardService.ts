import { mainHeader } from "./index";
import axios from "axios";
// import {apiModule} from "./apiModule"

const AXIOS = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const dashdoardService = {getPartnerApps, createPartnerApps, regenerateScretAndApp, deleteApp, editApp, getTradeSession, deleteTradingSession};

function getHeaders() {
  return {
    headers: mainHeader(),
  };
}

function getPartnerApps(){
    return AXIOS.get(`v1/portal/dev/get/apps`, getHeaders())
}
function createPartnerApps(payload:any){
    return AXIOS.post(`v1/portal/dev/create/apps`, payload, getHeaders())
}
function regenerateScretAndApp(payload:any){
    return AXIOS.post(`v1/portal/dev/regenerate/appcode`,payload, getHeaders())
}
function deleteApp(payload:any){
    return AXIOS.post(`v1/portal/dev/delete/apps`, payload, getHeaders())
} 
function editApp(payload:any){
  return AXIOS.post(`v1/portal/dev/edit/apps`, payload.json, getHeaders())
} 

// SESSION APIS
function getTradeSession(){
  return AXIOS.get(`v1/portal/dev/get/self/user/session`, getHeaders())
}

function deleteTradingSession(payload:any){
  return AXIOS.post(`developers-api/dev/revoke/user`,payload, getHeaders())
}