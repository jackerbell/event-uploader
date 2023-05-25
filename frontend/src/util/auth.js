import { redirect } from "react-router-dom";

export function getTokenDuration() {
  const storedExpriationDate = localStorage.getItem('expiration');
  const expirationDate = new Date(storedExpriationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime(); // 토큰이 유효하다면 양수, 만료면 음수
  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem('token');


  if(!token){
    return null;
  }

  const tokenDuration = getTokenDuration();
  if(tokenDuration < 0){
    return 'EXPIRED';
  }



  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if(!token){
    return redirect('/auth');
  }

  return null;
}