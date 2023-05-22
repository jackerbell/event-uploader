import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import HomePage from './pages/Home';
import EventsPage,{loader as eventsLoader} from './pages/Events';
import EventDetailPage,{
  loader as eventDetailLoader,
  action as deleteEventAction} from './pages/EventDetail';
import NewEventPage,{action as newEventAction} from './pages/NewEvent';
import EditEventPage from './pages/EditEvent';
import Root from './pages/Root';
import EventsRoot from './pages/EventsRoot';
import Error from './pages/Error';

const router = createBrowserRouter([
  {
    path:'/',
    element: <Root />,
    errorElement: <Error />,
    children:[
    {index:true,element:<HomePage />},
    {path:'events',element: <EventsRoot />, children:[
      {
        index: true,
        element: <EventsPage />, 
        loader :eventsLoader,
      },
      {
        path:':eventId',
        id:'event-detail',
        loader: eventDetailLoader,
        children:[
          {
            index:true,
            element:<EventDetailPage />, 
            action: deleteEventAction
          },
          {
            path:'edit',
            element:<EditEventPage/>
          },
        ]
      },
      {path:'new',element:<NewEventPage />, action : newEventAction},
    ]},
  ]},
]);


function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
