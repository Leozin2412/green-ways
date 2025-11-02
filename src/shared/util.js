export function isEmail (email) {
  let emailPattern =  /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/
   return emailPattern.test(email)
}
export function isPassword(password){
    return password.length >=8 
}
export function isCompleteName(name){
    return name.split(' ').length >= 2 
}