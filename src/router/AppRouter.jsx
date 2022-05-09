import {React,useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {startCheking} from '../actions/auth';
import {
    BrowserRouter as Router,Switch,Redirect} from"react-router-dom";
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {

 const dispatch =  useDispatch();

 const {checking,uid} = useSelector(state => state.auth)
   
  // console.log(checking);

   useEffect(() => {
     dispatch(startCheking())
   }, [dispatch])
    
 if(checking){
   return  (<h5>Espere.....</h5>);
 }



  return (

        
    <Router>

    <div>

        <Switch>
           <PublicRoute exact path="/login" component={LoginScreen} isAuthenticated={!!uid} />

           <PrivateRoute  exact path="/" component={CalendarScreen} isAuthenticated={!!uid} />
           
           <Redirect to="/"/>

        </Switch>
    </div>


    </Router>
  )
}
  