import { combineReducers } from "redux"
import { authReducer } from "./authReducer";
import { calendarReducer } from "./calendarReducer";
import { uireducer } from "./uiReducer"

export const rootReducer = combineReducers({
    ui:uireducer,
    calendar:calendarReducer,
    auth:authReducer,
});