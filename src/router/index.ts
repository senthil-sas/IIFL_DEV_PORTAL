import store from '@/store';
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landingPage',
      component: () => import('../views/HOME/HomeIndex.vue')
    },
    {
      path: '/developer/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/developer/',
      name: 'home',
      component: () => import('../views/Dashboard.vue'),
      children: [
        {
          path: '',
          name: 'myapps',
          component: () => import('../components/dashboard/MyApp.vue'),
        },
        {
          path: 'create_app',
          name: 'create_app',
          component: () => import('../components/dashboard/CreateApp.vue'),
        },
        {
          path: 'approval',
          name: 'approval',
          component: () => import('../components/dashboard/approval/approval-home.vue'),
        }
      ]
    },
    // {
    //   path: '/api_docs',
    //   name: 'api_docs',
    //   component: () => import('../components/docs/ApiDocs.vue'),
    // },
    // {
    //   path: '/community',
    //   name: 'community',
    //   component: () => import('../components/community/Community.vue'),
    // },
  ]
})
router.beforeEach(async (_to, _from, next) => {
  const accessToken =
    localStorage.getItem("accessToken") &&
      localStorage.getItem("accessToken") != "undefined"
      ? JSON.parse(localStorage.getItem("accessToken")!)
      : null;
  const companyName =
    localStorage.getItem("companyName") &&
      localStorage.getItem("companyName") != "undefined"
      ? JSON.parse(localStorage.getItem("companyName")!)
      : null;

  if (companyName) {
    store.commit("auth/setCompanyName", companyName);
  }
  if (accessToken) {
    store.commit("auth/setAccessToken", accessToken);
  }
  const userData = JSON.parse(localStorage.getItem('userData')!)
  if(userData && Object.keys(userData).length) {
      store.dispatch("auth/setUserDetails", userData)
  }
  const isValid = validSession();
  // if (isValid && _to.path === "/" && !_from.path.includes('/developer') && Object.keys(_to.query).length === 0) {
  //   // Only redirect to /home if there are no query params
  //   // next({ path: "/developer/home" });
  // } else 
    if (!isValid && _to.path !== "/" && _from.path !== "/") {
    store.dispatch("errorHandle/resetLocal", "", { root: true });
    next("/");
  } else {
    next();
  }
})
export default router


function validSession() {
  const today = new Date().toDateString();
  let accessToken = localStorage.getItem("accessToken") && localStorage.getItem("accessToken") != "undefined" && localStorage.getItem("accessToken") != "null" ? JSON.parse(localStorage.getItem("accessToken")!) : null;
  const lastVisit = localStorage.getItem("lastVisit");

  if (accessToken) {
    // Session exists — check if it's from yesterday
    if (!lastVisit || (lastVisit !== today)) {
      // Clear old session
      localStorage.removeItem("accessToken");
      localStorage.removeItem("lastVisit");
      accessToken = null;
    }
  }
  // Save today's visit date if not set
  localStorage.setItem("lastVisit", today);

  accessToken ? store.commit("auth/setAccessToken", accessToken) : "";
  if (accessToken) {
    return true;
  } else {
    return false;
  }
}
