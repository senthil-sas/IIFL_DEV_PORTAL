import { authHeader } from "./index";
import axios from "axios";
import {apiModule} from "./apiModule"

const AXIOS = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

export const authService = {sendPartnerMobiOtp, verifyPartnerMobiOtp, sendPartnerEmailOtp, 
verifyPartnerEmailOtp, saveCmpDetails, createPass, verifyClient, passwordVerify, otpVerify, resendOtp,
forgetOtpSend, forgetOtpVerify, resetPass, ssoLogin};

function getHeaders() {
  return {
    headers: authHeader(),
  };
}


function sendPartnerMobiOtp(payload:any){
    return AXIOS.post(`v1/portal/partner/regs/otp/mobile`, payload, getHeaders())
}
function verifyPartnerMobiOtp(payload:any){
    return AXIOS.post(`v1/portal/partner/regs/otp/verify/mobile`, payload, getHeaders())
}
function sendPartnerEmailOtp(payload:any){
    return AXIOS.post(`v1/portal/partner/regs/otp/email`, payload, getHeaders())
}
function verifyPartnerEmailOtp(payload:any){
    return AXIOS.post(`v1/portal/partner/regs/otp/verify/email`, payload, getHeaders())
}
function saveCmpDetails(payload:any){
    return AXIOS.post(`v1/portal/partner/regs/company`, payload, getHeaders())
}

function createPass(payload:any){
    return AXIOS.post(`v1/portal/partner/regs/set/pwd`, payload, getHeaders())
}

function verifyClient(payload:any){
    return AXIOS.post(`v1/portal/dev/verify/user`, payload, getHeaders())
}
function passwordVerify(payload:any){
    return AXIOS.post(`v1/portal/dev/login`, payload, getHeaders())
}

function resendOtp(payload:any){
    return AXIOS.post(`v1/portal/dev/resend-otp`, payload, getHeaders())
}

function otpVerify(payload:any){
    return AXIOS.post(`v1/portal/dev/login/otp/verify`, payload, getHeaders())
}

function forgetOtpSend(payload:any){
    return AXIOS.post(`v1/portal/access/pwd/forget`, payload, getHeaders())
}

function forgetOtpVerify(payload:any){
    return AXIOS.post(`v1/portal/access/reset/pwd/otp/verify`, payload, getHeaders())
}
function resetPass(payload:any){
    return AXIOS.post(`v1/portal/access/rest/new/pwd`, payload, getHeaders())
}
function ssoLogin(payload:any) {
    return AXIOS.post(`https://sandboxapi.iiflcapital.com/v1/getusersession`, payload, getHeaders())
}
