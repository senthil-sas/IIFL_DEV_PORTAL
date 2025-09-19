import router from "@/router";
import { authService } from "@/services/authService";
import { errHandle } from "@/errorHandle/errorHandle"

async function sha256(message:string) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
} 

const getDefaultState = () => {
  return {
    isLoader: false,
    userId: "",
    companyDetails: {
      name: "",
      website:""
    },
    authSession: '',
    userMailId: "",
    accessToken : '',
    errorMsg:'',
    avatarDetails:{},
    maskedEmail: "",
    maskedMobile: "",
    companyName:'',
    ssoVendor: 'slqhgvKvdQWVvUS',
    ssoQuery: '',
    ssoLoader: false,

    keyCloakData: {},
    userRoles: [],
    userRole: '',
    isSuperAdmin: false,
    isSelf: false,
    userDetails: {}
  }
}
const state = getDefaultState()

const mutations = {
  setIsLoader(state: any, payload: any) {
    state.isLoader = payload;
  },
  setUserId(state: any, payload: any) {
    state.userId = payload;
    localStorage.setItem('userId',JSON.stringify(state.userId))
  },
  setAccessToken(state: any, payload: any) {
    state.accessToken = payload;
    localStorage.setItem('accessToken',JSON.stringify(state.accessToken))
  },
  setErrMsg(state: any, payload: any) {
    state.errorMsg = payload;
  },
  setCompanyDetails(state:any, payload:any) {
    state.companyDetails = payload
    localStorage.setItem("companyDetails", payload)
  },
  setAuthSession(state:any, payload:any) {
    state.authSession = payload
    localStorage.setItem("authSession", payload)
  },
  setCompanyName(state:any, payload:any) {
    state.companyName = payload
    localStorage.setItem("companyName", JSON.stringify(payload))
  },
  setUserMailId(state:any, payload:any) {
    state.userMailId = payload
  },
  setAvatarDetails(state:any, payload:any) {
    state.avatarDetails = payload
  },
  resetState(state:any) {
    Object.assign(state, getDefaultState())
  },
  setMaskedEmail(state:any, payload:any) {
    state.maskedEmail = payload
  },
  setMaskedMobile(state:any, payload:any) {
    state.maskedMobile = payload
  },
  setSsoQuery(state:any, payload:any) {
    state.ssoQuery = payload
  },
  setSsoLoader(state:any, payload:any) {
    state.ssoLoader = payload
  },
  setKeyCloakUserData(state: { keyCloakData: any }, payload: any) {
    state.keyCloakData = payload
  },
  setUserRoles(state: { userRoles: any }, payload: any) {
    state.userRoles = payload
  },
  setUserRole(state: { userRole: any }, payload: any) {
    state.userRole = payload
  },
  setIsSuperAdmin(state: { isSuperAdmin: boolean }, payload: boolean) {
    state.isSuperAdmin = payload
  },
  setIsSelf(state: { isSelf: boolean}, payload: boolean) {
    state.isSelf = payload
  }
};
const actions = {
  // Check isValid user
  async verifyClient({ commit, dispatch }: any, payload: any) {
    commit("setIsLoader", true);
    await authService
      .verifyClient(payload)
      .then(
        (resp: any) => {
          if (
            resp.status == 200 &&
            resp.data.message  
          ) {  
            resp.data.message == "Existing user" ? commit('setLoginStage','password',{root:true}) :
            resp.data.message != "Existing user" ? commit('setLoginStage','partnerNotFound',{root:true}) : 
            commit('setErrMsg', resp.data.message )
          }
        },
        (error) => {
          dispatch("errorHandle/errorLog", error, { root: true })
        }
      )
      .finally(() => {
        commit("setIsLoader", false);
      });
  },

  // Existing User Flow 
  async passwordVerify({ commit, dispatch }: any, payload: any) {
    commit('setAvatarDetails',{})
    commit("setIsLoader", true);
    const json = {
      "identifier": state.userId,
      "password": payload
    }
    await authService
      .passwordVerify(json)
      .then(
        (resp: any) => { 
          if (
            resp.status == 200 &&
            resp.data.status == "OK" &&
            resp.data.message == "Success" &&
            resp.data.result
          ) { 
            if(resp.data.result[0].status == 'Success' ){
              commit('setAvatarDetails', resp.data.result[0])
              resp.data.result[0].message == "OTP sent successfully" ? commit('setLoginStage','otpVerification',{root:true}) : ''
            }
          } else{
            commit('setErrMsg', resp.data.message || resp.data.result.message )
          }
        },
        (error) => {
          dispatch("errorHandle/errorLog", error, { root: true })
        }
      )
      .finally(() => {
        commit("setIsLoader", false);
      });
  },
  async resendOtp({ commit, dispatch }: any) {
    commit("setIsLoader", true);
    const json = {
      "identifier": state.userId,
    }
    await authService.resendOtp(json).then(
        (resp: any) => { 
          if ( resp.status == 200 && resp.data.status == "OK" && resp.data.message == "Success" && resp.data.result) { 
            // if(resp.data.result[0].status == 'Success' ){
              
            // }
          } else{
            commit('setErrMsg',resp.data.message )
          }
        },
        (error) => {
          dispatch("errorHandle/errorLog", error, { root: true })
        }
      )
      .finally(() => {
        commit("setIsLoader", false);
      });
  },
  async otpVerify({ commit, dispatch }: any, payload: any) {
    commit("setIsLoader", true);
    const json = {
      "identifier": state.userId,
      "otp": payload
    }
    await authService
      .otpVerify(json)
      .then(
        async (resp: any) => {
          if (
            resp.status == 200 &&
            resp.data.status == "Ok" &&
            resp.data.message == "Success" &&
            resp.data.result
          ) { 
              if(resp.data.result.status == 'Success' && resp.data.result.message && resp.data.result.message == 'OTP verified, access granted'){
                const cmpName = resp.data.result.companyName ? resp.data.result.companyName :''
                commit("setCompanyName", cmpName)
                await commit('setAccessToken', resp.data.result.accessToken)
                const obj = {
                  "userSession": resp.data.result.accessToken,
                  "role": resp.data.result.role
                }
                dispatch("setUserDetails", obj)
                router.push({ name: 'myapps' });
              }
          }else{
            commit('setErrMsg',resp.data.message )
          }
        },
        (err) => {
          console.log(err);
        }
      )
      .finally(() => {
        commit("setIsLoader", false);
      });
  },
  // Existing User Flow End

  // New User Flow 
  // New User Flow End
  async sendPartnerMobilOtp({ commit }: any, payload:String) {
    commit("setIsLoader", true);
    const json = {
      "mobile": payload
    }
    await authService
      .sendPartnerMobiOtp(json)
      .then(
        (resp: any) => {
          if ( resp.status == 200 && Array.isArray(resp.data.result) && resp.data.result[0]?.status == "Success") {
            commit("setUserId", payload)
            if(resp.data.result[0]?.message) {
              const message = resp.data.result[0]?.message
              const maskedMobileOrEmail = 
                    message.match(/\d{2}\*+\d{2}/)?.[0] || // Match masked mobile
                    message.match(/[\w.]*\*+[\w.]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)?.[0]; // Match masked email
              commit("setMaskedMobile", maskedMobileOrEmail )
            }
            commit('setLoginStage', 'mobileOtpVerification', { root: true })
          } else {
            commit('setErrMsg',resp.data.message )
          }
        },
        (err) => {
          console.log(err);
        }
      )
      .finally(() => {
        commit("setIsLoader", false);
      });
  },

  async verifyPartnerMobilOtp({ state, commit }: any, payload:String) {
    commit("setIsLoader", true);
    const json = {
      "mobile": state.userId,
      "otp": payload
  }
    await authService
      .verifyPartnerMobiOtp(json)
      .then(
        (resp: any) => {
          if ( resp.status == 200 && Array.isArray(resp.data.result) && resp.data.result[0]?.status == "Success" ) {
            commit("setAuthSession", resp.data.result[0]?.accessToken)
            commit('setLoginStage', 'emailVerify', { root: true })
          } else {
            commit('setErrMsg', resp.data.message )
          }
        },
        (err) => {
          console.log(err);
        }
      )
      .finally(() => {
        commit("setIsLoader", false);
      });
  },

  async sendPartnerEmailOtp({ commit }: any, payload:String) {
    commit("setIsLoader", true);
    const json = {
      "email": payload
    }
    await authService
      .sendPartnerEmailOtp(json)
      .then(
        (resp: any) => {
          if ( resp.status == 200 && Array.isArray(resp.data.result) && resp.data.result[0]?.status == "Success" ) {
            commit("setUserMailId", payload)
            if(resp.data.result[0]?.message) {
              const maskedEmail = resp.data.result[0]?.message.match(/[\w.]*\*+[\w.]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)?.[0];
              commit("setMaskedEmail", maskedEmail)
            }
            commit('setLoginStage', 'emailOtpVerify', { root: true })
          } else {
            commit('setErrMsg', resp.data.message )
          }
        },
        (err) => {
          console.log(err);
        }
      )
      .finally(() => {
        commit("setIsLoader", false);
      });
  },

  async verifyPartnerEmailOtp({ state, commit }: any, payload:String) {
    commit("setIsLoader", true);
    const json = {
      "email": state.userMailId,
      "otp": payload
    }
    await authService
      .verifyPartnerEmailOtp(json)
      .then(
        (resp: any) => {
          if ( resp.status == 200 && Array.isArray(resp.data.result) && resp.data.result[0]?.status == "Success"  ) {
            commit('setLoginStage', 'createNewPartner', { root: true })
          } else {
            commit('setErrMsg', resp.data.message )
          }
        },
        (err) => {
          console.log(err);
        }
      )
      .finally(() => {
        commit("setIsLoader", false);
      });
  },

  async saveCmpDetails({ state, commit }: any, payload:String) {
    commit("setIsLoader", true);
    const json = {
      "companyName": state.companyDetails.name,
      "companyWebsite": state.companyDetails.website,
      "businessType": payload
    }
    await authService
      .saveCmpDetails(json)
      .then(
        (resp: any) => {
          if ( resp.status == 200 && Array.isArray(resp.data.result) && resp.data.result[0]?.status == "Success" ) {
            commit('setLoginStage', 'newPasswordForPartner', { root: true })
          } else {
            commit('setErrMsg', resp.data.message )
          }
        },
        (err) => {
          console.log(err);
        }
      )
      .finally(() => {
        commit("setIsLoader", false);
      });
  },

  async createPassword({ commit }: any, payload:String) {
    commit("setIsLoader", true);
    const json = {
      "password": payload
    }
    await authService
      .createPass(json)
      .then(
        (resp: any) => {
          if ( resp.status == 200 && Array.isArray(resp.data.result) && resp.data.result.length && resp.data.result[0]?.status == "Success" ) {
            commit('setstageMsg', 'You have successfully created your new password', { root: true });
            setTimeout(() => {
                commit('setstageMsg', null, { root: true });
                commit('setLoginStage', 'password',  { root: true });
            }, 2500);
          } else {
            commit('setErrMsg', resp.data.message )
          }
        },
        (err) => {
          console.log(err);
        }
      )
      .finally(() => {
        commit("setIsLoader", false);
      });
  },

  //FORGET PASS FLOW
  async sendForgetOtp({ commit }: any) {
    commit('setAvatarDetails', {})
    commit("setIsLoader", true);
    const json = {
      "identifier": state.userId
    }
    await authService
      .forgetOtpSend(json)
      .then(
        (resp: any) => {
          if ( resp.status == 200 && Array.isArray(resp.data.result) && resp.data.result[0]?.status == "Success" && resp.data.status == 'OK') {
            commit('setLoginStage', 'forgetPasswordOtp',{root:true})
            commit('setAvatarDetails', resp.data.result[0])
          } else {
            commit('setErrMsg', resp.data.message )
          }
        },
        (err) => {
          console.log(err);
        }
      )
      .finally(() => {
        commit("setIsLoader", false);
      });
  },

  async verifyForgetOtp({ state, commit }: any, payload:String) {
    commit("setIsLoader", true);
    const json = {
      "identifier": state.userId,
      "otp": payload
    }
    await authService
      .forgetOtpVerify(json)
      .then(
        async (resp: any) => {
          if ( resp.status == 200 && Array.isArray(resp.data.result) && resp.data.result[0]?.status == "Success"  ) {
            await commit('setAuthSession', resp.data.result[0].accessToken)
            commit('setLoginStage', 'setNewPassword',{root:true});
          } else {
            commit('setErrMsg', resp.data.message )
          }
        },
        (err) => {
          console.log(err);
        }
      )
      .finally(() => {
        commit("setIsLoader", false);
      });
  },

  async resetPassword({ commit }: any, payload:String) {
    commit("setIsLoader", true);
    const json = {
      "password": payload
    }
    await authService
      .resetPass(json)
      .then(
        (resp: any) => {
          if ( resp.status == 200 && resp.data.message == "Success" ) {
            commit('setstageMsg', 'You have successfully updated your new password', { root: true });
            setTimeout(() => {
                commit('setstageMsg', null, { root: true });
                commit('setLoginStage', 'password',  { root: true });
            }, 2500);
          } else {
            commit('setErrMsg', resp.data.message )
          }
        },
        (err) => {
          console.log(err);
        }
      )
      .finally(() => {
        commit("setIsLoader", false);
      });
  },

  async getSsoSession({ commit, dispatch }: any, payload:any) {
    commit("setErrMsg", null);
    commit("setSsoLoader", true)
    // const json = {
    //   vendor: state.ssoVendor,
    //   authCode: state.ssoQuery.authcode,
    // };
    const json = {
      "checkSum": await sha256(`${payload.clientid}${payload.authcode}${payload.APPSECRET}`)
    }
    await authService.ssoLogin(json).then(async(resp:any) => {
        if (resp.data?.status?.toString()?.trim() === "Ok") {
          const cmpName = resp.data.clientId ? resp.data.clientId : payload.clientid
          commit("setCompanyName", cmpName)
          await commit('setAccessToken', resp.data.userSession)
          await dispatch("setUserDetails", resp.data)
          router.push({ name: 'myapps' });
        }else if (resp.data.message || resp.data.emsg) {
          commit("setErrMsg", resp.data.message || resp.data.emsg);
          errHandle.localClear()
          const toasterParam = {
            title: "",
            type: "danger",
            message: resp.data.message || resp.data.emsg,
            duration: 4500,
          }
          dispatch("errorHandle/toaster", { data: toasterParam, position: "" }, { root: true })
        }
    },(error:any)=> {
      console.log(error);
    })
    .finally(() => {
      commit("setSsoLoader", false)
    });
  },

  async parseJWT({ commit, dispatch }: any, payload: any) {
    const jwt_decode = (token: string) => {
      try {
        return JSON.parse(atob(token.split('.')[1]));
      } catch (e) {
        return null;
      }
    }
    if (!payload || !payload.userSession) {
      return
    }
    const token = payload.userSession;
    const decoded: any = jwt_decode(token);

    if (decoded) {
      commit("setKeyCloakUserData", decoded)
      const type = decoded.azp
      commit("setIsSelf", type == 'IIFL')
      if (decoded.resource_access && decoded.resource_access[type] && decoded.resource_access[type].roles) {
        const userRoles = decoded.resource_access[type].roles
        // console.log(userRoles, 'userRoles');
        commit("setUserRoles", userRoles)
        // commit("setUserRole", userRoles.includes("SUPER_ADMIN") ? "SUPER_ADMIN" : "SELF")
        commit("setUserRole", userRoles.includes("PARTNER_ADMIN") ? "PARTNER_ADMIN" : "USER")
        commit("setIsSuperAdmin", userRoles.includes("PARTNER_ADMIN"))
      }
    }
    dispatch("dashboard/setHeaderTabs", state.isSuperAdmin, { root: true })
  },

  async setUserDetails({ state, dispatch }: any, payload: any) {
    state.userDetails = payload
    localStorage.setItem('userData', JSON.stringify(state.userDetails))
    dispatch("parseJWT", payload)
  },
};
const getters = {
  getIsLoader: (state: any) => state.isLoader,
  getUserId: (state: any) => state.userId,
  getErrorMsg: (state:any) => state.errorMsg,
  getAuthSession: (state:any) => state.authSession,
  getUserMailId: (state:any) => state.userMailId,
  getAvatarDetails: (state:any) => state.avatarDetails,
  getMaskedMobile: (state:any) => state.maskedMobile,
  getMaskedEmail: (state:any) => state.maskedEmail,
  getCmpName: (state:any) => state.companyName,
  getSsoLoader: (state:any) => state.ssoLoader,
  getUserDetails: (state: { userDetails:any }) => state.userDetails,

  getKeyCloakData: (state: { keyCloakData:any }) => state.keyCloakData,
  getUserRoles: (state: { userRoles:any }) => state.userRoles,
  getUserRole: (state: { userRole:any }) => state.userRole,
  getIsSuperAdmin: (state: { isSuperAdmin:boolean }) => state.isSuperAdmin,
  getIsSelf: (state: { isSelf:boolean }) => state.isSelf
};
const namespaced = true;
const auth = {
  state,
  namespaced,
  mutations,
  actions,
  getters,
};
export default auth;
