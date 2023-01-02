import { combineReducers } from "redux"
import settings from "./settings"
import auth from "./auth"
import university from "./university"

export const reducer = combineReducers({
    settings,
    auth,
    university
})