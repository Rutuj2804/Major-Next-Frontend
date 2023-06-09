import { combineReducers } from "redux"
import settings from "./settings"
import auth from "./auth"
import university from "./university"
import classReducer from "./class"
import roles from "./roles"
import subjects from "./subjects"
import notes from "./notes"
import assignments from "./assignments"
import lecture from "./lecture"
import events from "./events"
import analytics from "./analytics"
import chat from "./chat"
import results from "./results"
import fees from "./fees"
import attendence from "./attendence"

export const reducer = combineReducers({
    settings,
    auth,
    university,
    class: classReducer,
    roles,
    subjects,
    notes,
    assignments,
    lecture,
    events,
    analytics,
    chat,
    results,
    fees,
    attendence,
})