import React, { useEffect, useState } from 'react'
import { Navbar } from '../ui/Navbar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar,momentLocalizer } from 'react-big-calendar';
import {messages} from '../../helpers/calendar-messages-español'
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import moment from 'moment';
import 'moment/locale/es';
import { useDispatch,useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearEvent, eventSetActive, eventStartLoading } from '../../actions/events';
import AddNewFab from '../ui/AddNewFab';
import DeleteEventFab from '../ui/DeleteEventFab';



moment.locale('es');
const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {

  const dispatch = useDispatch();
  const {events,activeEvent} = useSelector(state => state.calendar);
  const {uid} = useSelector(state => state.auth);

  const [lasView, setLasView] = useState( localStorage.getItem('lasView')|| 'month');
 


  useEffect(() => {
    dispatch (eventStartLoading());
  }, [dispatch])
  

  const onDoubleClick = (e) => {
     dispatch(uiOpenModal())
  }

  const onSelectEvent = (e) => {
      dispatch(eventSetActive(e));
  }

  const onViewChange = (e) => {
    setLasView(e);
    localStorage.setItem('lasView',e);
  }


   const onSelectSlot = (e) => {
     dispatch( eventClearEvent());
   }


const eventStyleGetter=(event,start,end,inSelected) => {


const style={
  backgroundColor:(uid === event.user._id) ? '#03a9f4' : '#465660',
  boderRadius:'0px',
  opacity:'0.95',
  display:'block',
  color:'#fff'

}
return{
  style
}
}

  return (
    <div>
      <Navbar/>

      <Calendar
      localizer={localizer}
      events={events }
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      messages={messages}
      eventPropGetter={eventStyleGetter}
      onDoubleClickEvent={onDoubleClick}
      onSelectEvent={onSelectEvent}
      onView={onViewChange}
      onSelectSlot={onSelectSlot}
      selectable={true}
      view={lasView}
      components={{ 
        event:CalendarEvent
      }}
      
    />


   <CalendarModal/>

   <AddNewFab/>

    {

(activeEvent) &&   <DeleteEventFab/>

    }
  
    </div>
  )
}
