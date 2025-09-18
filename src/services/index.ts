import store from "../store"; 

export function authHeader() {  
    const token = store.state.auth.authSession;
    let headers;
    if (token) {
      headers = { Authorization: 'Bearer ' + token };
    } else {
      headers = {
        'Content-Type': 'application/json',
      };
    }
    return headers;
  }

  export function mainHeader() {
    const token = store.state.auth.accessToken;
    let headers;
    if (token) {
      headers = { Authorization: 'Bearer ' + token };
    } else {
      headers = {
        'Content-Type': 'application/json',
      };
    }
    return headers;
  }