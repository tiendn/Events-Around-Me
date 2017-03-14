
class GlobalVars {
  isLogin;
  constructor() {
    this.isLogin = false;
  }
  setLogin(isLogin){
      this.isLogin = isLogin;
  }
  
  getLogin(){
      return this.isLogin;
  }
}

export default GlobalVars;