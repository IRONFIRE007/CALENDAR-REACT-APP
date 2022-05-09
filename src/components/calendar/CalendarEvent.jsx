import React from 'react'

export const CalendarEvent = ({event}) => {
    const {title,user} = event;
  return (
      <>
    <h6>{title}</h6>
    <h6>{user.name}</h6>
    </>
  )
}
