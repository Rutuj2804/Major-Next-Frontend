import { combineReducers } from "redux"
import settings from "./settings"
import auth from "./auth"
import university from "./university"
import classReducer from "./class"

export const reducer = combineReducers({
    settings,
    auth,
    university,
    class: classReducer
})