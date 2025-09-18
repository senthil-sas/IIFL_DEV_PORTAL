import router from "@/router";
import { dashdoardService } from "@/services/dashdoardService";

const state = {
  isLoader: false,
  partnerApps: [],
  editData: {},
  errorMsg: '',
  editLoader: false,
  sessionLoader:false,
  tradingSession:{
    trading:[],
    nonTrading:[]
  },
  activeSessionTab:'',
  isDeleteSession:false,
  sessionDeleteData:[],
  headerTabs: [],
  isConfirmDialog: false,
  isViewDetailsDialog: false
};
const mutations = {
  setIsLoader(state: any, payload: any) {
    state.isLoader = payload;
  },
  setPartnerApps(state: any, payload: any) {
    state.partnerApps = payload;
  }, 
  setEditData(state:any, payload:any) {
    state.editData = payload
  },
  setEditLoader(state:any, payload:any) {
    state.editLoader = payload
  },
  setSessionLoader(state:any, payload:any) {
    state.sessionLoader = payload
  },
  setTradingSession(state:any, payload:any) {
    state.tradingSession = payload
  },
  setActiveSessionTab(state:any, payload:any) {
    state.activeSessionTab = payload
  },
  setIsDeleteSession(state:any, payload:any) {
    state.isDeleteSession = payload
  },
  setSessionDeleteData(state:any, payload:any) {
    state.sessionDeleteData = payload
  },
  setIsConfirmDialog(state:any, payload:any) {
    state.isConfirmDialog = payload
  },
  setIsViewDetailsDialog(state:any, payload:any) {
    state.isViewDetailsDialog = payload
  }
};
const actions = { 
  async getPartnerApps({ commit, dispatch }: any, payload:any) {
    let data:any = []
    if(payload != 'regenerate' && payload != 'delete'){
      commit("setIsLoader", true);
    }
    
    await dashdoardService
      .getPartnerApps()
      .then(
        (resp: any) => {
          if (
            resp.status == 200 &&
            resp.data.status == "OK" &&
            resp.data.message == "Success" &&
            resp.data.result && 
            resp.data.result.length > 0
          ) { 
              if(resp.data.result[0].status == 'Success' && resp.data.result[0].apps && resp.data.result[0].apps.length > 0){                 
                data = resp.data.result[0].apps
              }
          }
        },
        (error) => {
         dispatch("errorHandle/errorLog", error, { root: true })
        }
      )
      .finally(() => {
        commit("setIsLoader", false);
        commit('setPartnerApps',  data)
      });
  },

  async createApp({ commit,dispatch }: any, payload: any) {
    commit("setIsLoader", true);
    await dashdoardService
      .createPartnerApps(payload)
      .then(
        (resp: any) => {
          if(resp.data.status == "OK" && resp.data.message == 'Success'){
            commit("setIsConfirmDialog", false)
            dispatch("getPartnerApps")
            router.push('/developer');
          } else {
            const toasterParam = {
              title: "",
              type: "danger",
              message: resp.data?.message,
              duration: 4500,
            }
            dispatch("errorHandle/toaster", { data: toasterParam, position: "" }, { root: true })
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

  async regenerateApp({state, commit, dispatch }: any) {
    commit("setEditLoader", true);
    const json = {
      "appId" : state.editData?.appId
    }
    await dashdoardService
      .regenerateScretAndApp(json)
      .then(
        (resp: any) => { 
          if (
            resp.status == 200 &&
            resp.data.status == "OK" &&
            resp.data.message == "Success" &&
            resp.data.result && 
            resp.data.result.length > 0
          ) { 
              if(resp.data.result[0].status == 'Success'){                 
                dispatch('getPartnerApps')
              }
          } else {
            const toasterParam = {
              title: "",
              type: "danger",
              message: resp.data?.message,
              duration: 4500,
            }
            dispatch("errorHandle/toaster", { data: toasterParam, position: "" }, { root: true })
          }
        },
        (error) => {
          dispatch("errorHandle/errorLog", error, { root: true })
        }
      )
      .finally(() => {
        commit("setEditLoader", false);
      });
  },

  async deleteApp({ state, commit, dispatch }: any) {
    commit("setEditLoader", true);
    const json = {
      "appId" : state.editData?.appId
    }
    await dashdoardService
      .deleteApp(json)
      .then(
        (resp: any) => { 
          if (
            resp.status == 200 &&
            resp.data.status == "OK" &&
            resp.data.message == "Success" &&
            resp.data.result && 
            resp.data.result.length > 0
          ) { 
              if(resp.data.result[0].status == 'Success'){                 
                dispatch('getPartnerApps')
              }
          } else {
            const toasterParam = {
              title: "",
              type: "danger",
              message: resp.data?.message,
              duration: 4500,
            }
            dispatch("errorHandle/toaster", { data: toasterParam, position: "" }, { root: true })
          }
        },
        (error) => {
          dispatch("errorHandle/errorLog", error, { root: true })
        }
      )
      .finally(() => {
        commit("setEditLoader", false);
      });
  },
  
  async editApp({ commit, dispatch }: any, payload: any) {
    commit("setEditLoader", true);
    await dashdoardService
      .editApp(payload)
      .then(
        (resp: any) => {
          if (
            resp.status == 200 &&
            resp.data.status == "OK" &&
            resp.data.message == "Success" &&
            resp.data.result &&
            resp.data.result.length > 0
          ) {
              if(resp.data.result[0].status == 'Success'  ){                
                dispatch('getPartnerApps')
                commit('showEdit', false, { root: true });
                // commit('showSuccess', true, { root: true })
              }
          } else {
            const toasterParam = {
              title: "",
              type: "danger",
              message: resp.data?.message,
              duration: 4500,
            }
            dispatch("errorHandle/toaster", { data: toasterParam, position: "" }, { root: true })
          }
        },
        (error) => {
          dispatch("errorHandle/errorLog", error, { root: true })
        }
      )
      .finally(() => {
        commit("setEditLoader", false);
      });
  },

  async getTradeSession({ commit }: any) {
    commit("setSessionLoader", true);
    await dashdoardService
      .getTradeSession()
      .then(
        (resp: any) => { 
          if (
            resp.status == 200 &&
            resp.data.status == "OK" &&
            resp.data.message == "Success" &&
            resp.data.result &&
            resp.data.result.length > 0
          ) {
              const trading = resp.data.result.filter((el:any)=> el.vendorType == 'tradingPartner' && el.userSession)
              const nonTrading = resp.data.result.filter((el:any)=> el.vendorType == 'nontrading'&& el.userSession)
              commit("setTradingSession", {trading,nonTrading}); 
          }  
        },
        (err) => {
          console.log(err);
        }
      )
      .finally(() => {
        commit("setSessionLoader", false);
      });
  },

  async deleteSession({ state, commit, dispatch }: any) {
    commit("setEditLoader", true);
    const id :any= []
    state.sessionDeleteData?.forEach((el:any) => {
      id.push(Number(el.id))      
    });
    const json = {
      sessionId : id
    }
    await dashdoardService
      .deleteTradingSession(json)
      .then(
        (resp: any) => { 
          if (
            resp.status == 200 &&
            resp.data.status == "Ok" &&
            resp.data.message == "Success"  
          ) {                
                dispatch('getTradeSession')
          } 
        },
        (error) => {
          dispatch("errorHandle/errorLog", error, { root: true })
        }
      )
      .finally(() => {
        commit("setEditLoader", false);
        commit("setIsDeleteSession", false)
      });
  },

  async setHeaderTabs({ state }: any, isAdmin: any) {
    const tabs = [
      { id: 0, name: 'My Apps', key: '', path: '/developer/' },
      // { id: 1, name: 'API Docs', key: '', path: '/developer/api_docs' },
      { id: 2, name: 'Community', key: '', path: '/developer/community', disabled:true },
    ]

    const adminTabs = [
      { id: 0, name: 'My Apps', key: '', path: '/developer/' },
      { id: 1, name: 'Apps Approval', key: '', path: '/developer/approval' },
      // { id: 2, name: 'API Docs', key: '', path: '/developer/api_docs' },
      { id: 3, name: 'Community', key: '', path: '/developer/community', disabled:true },
    ]

    state.headerTabs = isAdmin ? adminTabs : tabs
  }
};
const getters = {
  getIsLoader: (state: any) => state.isLoader,
  getPartnerApps: (state: any) => state.partnerApps,
  getEditData: (state:any) => state.editData,
  getEditLoader: (state:any) => state.editLoader,
  getTradingSession:(state:any)=>state.tradingSession,
  getIsDeleteSession:(state:any)=>state.isDeleteSession,
  getSessionDeleteData:(state:any)=>state.sessionDeleteData,
  getHeaderTabs: (state:any) => state.headerTabs,
  getIsConfirmDialog: (state:any) => state.isConfirmDialog,
  getIsViewDetailsDialog: (state:any) => state.isViewDetailsDialog
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
