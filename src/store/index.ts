import { createStore } from "vuex";
import router from "../router/index";
// import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import auth from "./auth";
import dashboard from "./dashoard"
import errorHandle from "./errorhandling"
import approval from "./approval"
import clientLogo from "@/assets/img/clientLogo.svg"

const getDefaultState = () => {
  return{
    loginStage: "mobile",
    prevLoginStage:"",
    activePageTab: 0,
    stageMsg: null,
    successMsg: null,
    isDelete: false,
    isEdit: false,
    isSuccess: false,
    windowHeight:0,
    windowWidth:0,
    isRegenerateSecretApp:true,
    stageModelStage:'delete',
    which:'UAT',//LIVE //UAT - key for different env
    isLogout: false,

    // Home page
    clientLogo: clientLogo,
    devAppKey : 'slqhgvKvdQWVvUS',
    // devPortalRedirectUrl : 'https://iifl.codifi.in/developer/#/?partner=true',
    devPortalRedirectUrl : 'https://iifl.codifi.in/#/developer/login',
    webPortalRedirectUrl :  `https://sandboxmarkets.iiflcapital.com/?appkey=slqhgvKvdQWVvUS&v=1`,
    communityRedirectUrl: 'https://github.com/IIFLCapital/IIFL-Markets-Open-API-Postman-Collection-Official-/issues',
  }
}
const store = createStore({
  
  state: getDefaultState(),
  mutations: {
    setLoginStage(state: any, payload: any) {
      state.loginStage = payload;
    },
    setActivePageTab(state: any, payload: any) {
      state.activePageTab = payload;
    },
    setstageMsg(state: any, payload: any) {
      state.stageMsg = payload;
    },
    setSuccessMessage(state: any, payload: any) {
      state.successMsg = payload.msg;
      setTimeout(() => {
        state.successMsg = null;
        router.push({path:payload.path})
      }, 2500);
    },
    showDelete(state: any, payload: any) {
      state.isDelete = payload;
    },
    showEdit(state: any, payload: any) {
      state.isEdit = payload;
    },
    showSuccess(state: any, payload: any) {
      state.isSuccess = payload;
    },
    setWindowInnerWidth(state:any,payload:any){
      state.windowWidth=payload
    },
    setWindowInnerHeight(state:any,payload:any){
      state.windowHeight=payload
    },
    setisRegenerateSecretApp(state:any,payload:any){
      state.isRegenerateSecretApp =payload;
    },
    setModelStage(state:any,payload:any){
      state.stageModelStage=payload;
    },
    resetState(state:any) {
      Object.assign(state, getDefaultState())
    },
    setIsLogout(state:any, payload:any) {
      state.isLogout = payload 
    }
  },
  actions: {},
  getters: {
    getLoginStage: (state: any) => state.loginStage,
    getstageMsg: (state: any) => state.stageMsg,
    getSuccessMessage: (state: any) => state.successMsg,
    getisDelete: (state: any) => state.isDelete,
    getisRegenerate:(state:any) =>state.isRegenerateSecretApp,
    getEdit: (state: any) => state.isEdit,
    getisSuccess: (state: any) => state.isSuccess,
    getModelStage:(state:any)=>state.stageModelStage,
    getIsLogout: (state:any) => state.isLogout
  },
  modules: {
    auth,
    dashboard,
    errorHandle,
    approval
  },
});

export default store;
