import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import '../../assets/css/modal.css'
import DateTimePicker from 'react-datetime-picker';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';
import {eventClearEvent, eventStartAndNew, eventStartUpdated} from '../../actions/events';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1,'hours');
const nowPlus1 = now.clone().add(1,'hours');

const initevent = {     
    title:'Evento',
    notes:'',
    start:now.toDate(),
    end:nowPlus1.toDate()
}

export const CalendarModal = () => {

  const dispatch =  useDispatch();

 const {modalOpen} = useSelector(state => state.ui);
 const {activeEvent} = useSelector(state => state.calendar);

 

 const [dateStart, setDateStart] = useState(now.toDate());
 const [dateEnd, setDateEnd] = useState(nowPlus1.toDate());
 const [titleValid, setTitleValid] = useState(true);
 const [placeholder, setPlaceholder] = useState('');
 
 const [formValues, setFormValues] = useState(initevent);
   
 const {notes,title,start,end} = formValues;


   const  handleStartDateChange = (e) =>{
    setDateStart(e);
      setFormValues({
          ...formValues,
          start:e
      })
   }

  const  handleEndDateChange = (e) =>{
    setDateEnd(e);
    setFormValues({
        ...formValues,
        end:e
    })
  }

  useEffect(() => {
   if(activeEvent){
       setFormValues(activeEvent);
   }
  }, [activeEvent,setFormValues]);
  

  const handleInputChange = ({target}) =>{
      setFormValues(
          {
            ...formValues,
            [target.name]:target.value
          }
      )
  }

 const  closeModal =() =>{
     dispatch(uiCloseModal());
     dispatch(eventClearEvent());
     setFormValues(initevent);
     
  }


  const handleSubmitForm =(e)=>{
      e.preventDefault();
       const momentStart = moment(start);
       const momentEnd = moment(end);
        if(momentStart.isSameOrAfter(momentEnd)){
            return Swal.fire('Eror','La fecha Final debe ser mayor que la de fecha de inicio','error'); 
        }

       if(title.trim().length <2){
            return(
                setTitleValid(false),
                setPlaceholder('El titulo debe tener mas de 2 caracteres')
            )
        }
   

       if(activeEvent){
           dispatch(eventStartUpdated(formValues));
       }else{
        dispatch(
            eventStartAndNew(formValues));
       }

      

    //  console.log(formValues);
        
         setTitleValid(true);

         closeModal();
         console.log(title);
  }

  return (
    <Modal
    isOpen={modalOpen}
    // onAfterOpen={afterOpenModal}
    closeTimeoutMS={200}
      onRequestClose={closeModal}
    style={customStyles}
    className="modal"
    overlayClassName="modal-fondo"
  >
      
      <h1> {(activeEvent ) ? 'Editar Evento'   :  'Nuevo evento' } </h1>
<hr />
<form className="container" onSubmit={handleSubmitForm}>

    <div className="form-group">
        <label>Fecha y hora inicio</label>
        <DateTimePicker onChange={handleStartDateChange} value={dateStart} className="form-control react-datetime-picker" />
    </div>

    <div className="form-group">
        <label>Fecha y hora de Finalizacion</label>
        <DateTimePicker onChange={handleEndDateChange} value={dateEnd} className="form-control react-datetime-picker" 
        minDate={dateStart}
        />
    </div>


    <hr />
    <div className="form-group">
        <label>Titulo</label>
        <input 
            type="text" 
            className={`form-control ${ !titleValid && 'is-invalid'}`}
            placeholder={placeholder}
            name="title"
            autoComplete="off"
            value={title}
            onChange={handleInputChange}
        />
        <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
    </div>

    <div className="form-group">
        <textarea 
            type="text" 
            className="form-control "
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
        ></textarea>
        <small id="emailHelp" className="form-text text-muted">Información adicional</small>
    </div>

    <button
        type="submit"
        className="btn btn-outline-primary btn-block"
    >
        <i className="far fa-save"></i>
        <span> Guardar</span>
    </button>

</form>
  </Modal>
  )
}
