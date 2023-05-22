import { useRouteLoaderData, json, redirect } from "react-router-dom";
import EventItem from '../components/EventItem';

const EventDetailPage = () => {
  const data = useRouteLoaderData('event-detail'); // useLoaderData와 거의 유사하게 동작,
  return (                                         // routeId를 인자로 받음.. 그래서 loader함수 위에 id를 새로 정의함.
    <EventItem event={data.event} />
  );
};

export default EventDetailPage;

export async function loader({request, params}) {
  const id = params.eventId;
  const response = await fetch('http://localhost:8080/events/' + id);

  if(!response.ok){
    throw json({ message:'Could not fetch details for selected event.' },{
      status:500
    });
  } else {
    return response;
  }
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