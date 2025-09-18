import router from "../router";
import notification from "../notification";
const state = {};
const mutations = {};
const actions = {

  toaster({ state }: any, payload: any) {
    notification.open(
      payload.data,
      payload.position ? payload.position : state.toasterPalce
    );
  },

  errorLog({ state, dispatch }: any, payload: any) {
    let tempToaster: any = {};
    if (payload.code == 'ERR_NETWORK') {
      tempToaster = {
        title: "",
        type: "danger",
        message: payload.message,
        duration: 4500,
      };
      dispatch("toaster", { data: tempToaster, position: "" })
      return
    }
    if(payload.response.status == 403) {
      tempToaster = {
        title: "",
        type: "danger",
        message: "You are not authorized to access this action",
        duration: 4500,
      };
    }
    else if (payload.response.status && payload.response.status == 404 || payload.response.status == 405 || payload.response.status == 415) {
      tempToaster = {
        title: "",
        type: "danger",
        message: "We'll Be Back Soon",
        duration: 4500,
      };
    } else if (
      payload.response.status &&
      payload.response.status > 400 &&
      payload.response.status < 500 && payload.response.status != 405 && payload.response.status != 403
    ) {
      payload.response.status == 401
        ? (tempToaster = {
          title: "",
          type: "danger",
          message: "Your session has been invalidated. Kindly re-login",
          duration: 4500,
          isPossibletoMulti: true,
        })
        : (tempToaster = {
          title: "",
          type: "danger",
          message: payload.response.data,
          duration: 4500,
          isPossibletoMulti: true,
        });
      dispatch("resetLocal");
    } else if (payload.response.status && (payload.response.status >= 500 || payload.response.status == 400)) {
      tempToaster = {
        title: "",
        type: "danger",
        message: "Something went wrong. Please try after sometime",
        duration: 4500,
      };
    }
    if (state.failureAcion != "router") {
      dispatch("toaster", { data: tempToaster, position: "" })
    }
  },

  async resetLocal({ commit }: any) {
    commit("approval/RESET_STATE", "", { root: true });
    // commit("auth/RESET_STATE", '', { root: true })
    const localStorageKeys = ["appDetails", "currentData","userData","userId","accessToken","companyDetails","authSession","companyName"]
    
    localStorageKeys.forEach(key => {
        localStorage.removeItem(key)
    })
    router.push("/?logout")
  },
};

const getters = {
};

const errorHandle = {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
};
export default errorHandle;
