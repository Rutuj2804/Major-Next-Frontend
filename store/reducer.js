import { combineReducers } from "redux"
import settings from "./settings"
import auth from "./auth"
import university from "./university"
import classReducer from "./class"
import roles from "./roles"
import subjects from "./subjects"
import notes from "./notes"
import assignments from "./assignments"

export const reducer = combineReducers({
    settings,
    auth,
    university,
    class: classReducer,
    roles,
    subjects,
    notes,
    assignments,
})