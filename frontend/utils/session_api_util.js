export function signup(user){
    return $.ajax({
      method: "Post",
      url: "/api/users",
      data: { user }
    })
  }
  
  export function signin(user) {
    return $.ajax({
      method: "Post",
      url: "/api/session",
      data: { user }
    })
  }
  
  export function logout() {
    return $.ajax({
      method: "delete",
      url: "/api/session"
    })
  }
  
  window.signin = signin
  window.signup = signup
  window.logout = logout