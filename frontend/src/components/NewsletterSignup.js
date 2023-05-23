import { useEffect } from 'react';
import { useFetcher } from 'react-router-dom';

import classes from './NewsletterSignup.module.css';

function NewsletterSignup() {
  const fetcher = useFetcher(); // loader나 클라이언트가 속한 페이지, 라우트를 로딩하지 않고 그것들을 트리거할 때 사용,
  const {data,state} = fetcher;

  useEffect(()=>{
    if(state === 'idle' && data && data.message){
      console.log(data);
      window.alert(data.message);
    }
  },[data,state])

  return (
    <fetcher.Form 
      method="post"
      action='/newsletter' 
      className={classes.newsletter}>
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;