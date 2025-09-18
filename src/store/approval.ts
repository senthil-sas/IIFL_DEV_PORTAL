// import router from "@/router";
import service from "@/services/approvalService";


const getDefaultState = () => {
    return {
        filterData: [],
        loader: false,
        appId: null,
        appInfo: null,
        approveLoader: false,
        rejectedLoader: false,
        approvalStatus: { name: "Pending", key: '0' },
        isConfirmationDialog: false,
        approvalLoading: false
    };
}

const state = getDefaultState();

const mutations = {
    setFilterData(state: any, payload: any) {
        state.filterData = payload;
    },
    setLoader(state: any, payload: any) {
        state.loader = payload;
    },
    setAppId(state: any, payload: any) {
        state.appId = payload;
    },
    setAppInfo(state: any, payload: any) {
        state.appInfo = payload
    },
    setApproveLoader(state: any, payload: any) {
        state.approveLoader = payload;
    },
    setRejectedLoader(state: any, payload: any) {
        state.rejectedLoader = payload;
    },
    RESET_STATE(state: any) {
        Object.assign(state, getDefaultState());
    },
    setSelectedStatus(state:any, payload:any) {
        state.approvalStatus = payload
    },
    setIsConfirmationDialog(state:any, payload:any) {
        state.isConfirmationDialog = payload
    },
    setApprovalLoading(state:any, payload:any) {
        state.approvalLoading = payload
    }
};
const actions = {
    async getAdminFilterData({ commit, dispatch }: any, payload: any) {
        commit("setLoader", true);
        await service.getAdminFilterAPI(payload).then((res: any) => {
            if (res?.data?.message == 'Success' && res?.data?.result.length && res.data?.status == "OK") {
                if (res?.data?.result[0]?.result) commit("setFilterData", res?.data?.result[0]?.result);
                else commit("setFilterData", []);
            }
            else {
                commit("setFilterData", []);
            }
        }, (error: any) => {
            dispatch("errorHandle/errorLog", error, { root: true })
        }).finally(() => {
            commit("setLoader", false);
        });
    },
    // async getAppInfo({ commit, dispatch }: any, payload: any) {
    //     commit("setLoader", true);
    //     await service.getAppDetailsAPI(payload).then(async (res: any) => {

    //         if (res?.data?.message == 'Success' && res?.data?.result.length && res.data?.status == "OK") {
    //             const [resultInfo] = res.data.result;
    //             await commit("setAppInfo", resultInfo?.app);
    //         }
    //         else {
    //             await commit("setAppInfo", null);
    //         }
    //     }, (error: any) => {
    //         dispatch("errorHandle/errorLog", error, { root: true })
    //     }).finally(() => {
    //         commit("setLoader", false);
    //     });
    // },
    
    async getApproveRejectApp({ commit, dispatch }: any, payload: any) {
        commit("setApprovalLoading", true)
        await service.getAppApproveReject(payload).then(async (res: any) => {
            if (res?.data?.message == 'Success' && res?.data?.result.length && res.data?.status == "OK") {
                const [resultInfo] = res.data.result;
                const toasterParam = {
                    title: "",
                    type: "success",
                    message: resultInfo?.message,
                    duration: 4500,
                }
                dispatch("errorHandle/toaster", { data: toasterParam, position: "" }, { root: true })
            }
            else {
                const [resultInfo] = res.data.result;
                const toasterParam = {
                    title: "",
                    type: "danger",
                    message: resultInfo?.message,
                    duration: 4500,
                }
                dispatch("errorHandle/toaster", { data: toasterParam, position: "" }, { root: true })
            }
        }, (error: any) => {
            dispatch("errorHandle/errorLog", error, { root: true })
        }).finally(() => {
            commit("setApprovalLoading", false)
        });
    },

    async getApproveBlockApp({ commit, dispatch }: any, payload: any) {
        commit("setApprovalLoading", true)
        await service.getAppApproveBlock(payload).then(async () => {
            
        }, (error: any) => {
            dispatch("errorHandle/errorLog", error, { root: true })
        }).finally(() => {
            commit("setApprovalLoading", false)
        });
    },
};
const getters = {
    getAdminFilterData: (state: any) => state.filterData,
    getAppId: (state: any) => state.appId,
    getAppInfo: (state: any) => state.appInfo,
    getLoader: (state: any) => state.loader,
    getApproveLoader: (state: any) => state.approveLoader,
    getRejectedLoader: (state: any) => state.rejectedLoader,
    getSelectedStatus: (state:any) => state.approvalStatus,
    getIsConfirmationDialog: (state:any) => state.isConfirmationDialog,
    getApprovalLoading: (state:any) => state.approvalLoading
};

const adminService = {
    namespaced: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters,
};
export default adminService;
