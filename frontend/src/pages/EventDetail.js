import { Suspense } from "react";
import { useRouteLoaderData, json, redirect, defer, Await } from "react-router-dom";

import EventItem from '../components/EventItem';
import EventsList from "../components/EventsList";

const EventDetailPage = () => {
  const {event,events} = useRouteLoaderData('event-detail'); // useLoaderData와 거의 유사하게 동작,
  return (                                         // routeId를 인자로 받음.. 그래서 loader함수 위에 id를 새로 정의함.
    <>
      <Suspense fallback={<p style={{textAlign:'center'}}>Loading...</p>}>
        <Await resolve={event}>
          {loadedEvent => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{textAlign:'center'}}>Loading...</p>}>
        <Await resolve={events}>
          {loadedEvents => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
};

export default EventDetailPage;

async function loadEvent(id) {
  const response = await fetch('http://localhost:8080/events/' + id);

  if(!response.ok){
    throw json(
      { message:'Could not fetch details for selected event.' },
      { 
        status:500
      }
    );
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

async function loadEvents() {
  const response = await fetch('http://localhost:8080/events/');

  if (!response.ok) {
    // return {isError:true, message: 'Could not fetch events.'}
    // throw new Response(JSON.stringify({message: 'Could not fetch events.'}),{
    //   status:500,
    // });
    return json(
      {message: 'Could not fetch events.'},
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export async function loader({request, params}) {
  const id = params.eventId;

  return defer({
    event: await loadEvent(id), //defer가 이 데이터가 로딩될 때까지 기더렸다가, 페이지 컴포넌트를 로딩함.
    events: loadEvents()
  });
}

export async function action({params,request}){
  const eventId = params.eventId;
  const response = await fetch('http://localhost:8080/events/' + eventId, {
    method: request.method,
  });
  if(!response.ok){
    throw json(
      { message:'Could not delete event.' },
      {
        status:500
      }
    );
  }
  return redirect('/events');
}