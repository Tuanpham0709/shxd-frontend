let token = null;

export const setToken = (_token: string) => {
  token = _token;
};

export const getToken = () : string =>{
  if (localStorage.getItem('_refreshToken')){
    return token;
  } else{
    if (window.location.pathname != '/login') {
      window.location.href = '/login';
    }
    return '';
  }
};
