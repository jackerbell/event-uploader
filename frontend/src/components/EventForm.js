import { Form, useNavigate, useNavigation,useActionData } from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation(); // 네비게이션 객체에 대한 액세스 제공, 현재 활성중인 데이터 처리 상태를 파악가능
  
  const isSubmitting = navigation.state === 'submitting';

  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method='post' className={classes.form}> {/* 벡엔드가 아닌 action property로 전송됨. */}
    {data && data.errors  && <ul>
      {Object.values(data.errors).map(err => 
          <li key={err}>{err}</li>
        )
      }
    </ul>}
      <p>
        <label htmlFor="title">Title</label>
        <input 
          id="title" 
          type="text" 
          name="title" 
          required 
          defaultValue={event ? event.title : ''} 
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input 
          id="image" 
          type="url" 
          name="image" 
          required
          defaultValue={event ? event.image : ''} />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input 
          id="date" 
          type="date" 
          name="date" 
          required
          defaultValue={event ? event.date : ''}
       />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea 
          id="description" 
          name="description" 
          rows="5" 
          required
          defaultValue={event ? event.description : ''} />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>{isSubmitting?'Submitting':'Save'}</button>
      </div>
    </Form>
  );
}

export default EventForm;
