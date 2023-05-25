import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { useEffect } from 'react';
import { getTokenDuration } from '../util/auth';

function RootLayout() {
  const token = useLoaderData(); // 이미 루트 라우트에 대해 렌더링 되는 컴포넌트에 있으므로 라우트로더 대신 사용
  const submit = useSubmit();
  // const navigation = useNavigation();
  useEffect(()=>{
    if(!token) {
      return;
    }

    if(token === 'EXPIRED'){
      submit(null,{action:'/logout',method:'post'});
      return;
    }

    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);

    setTimeout(() => {
      submit(null,{
        action:'/logout',method:'post'})
    }, tokenDuration); // 1시간 뒤 토큰 만료, 자동 로그아웃!
  },[token, submit]);
  

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
