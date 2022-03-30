import userContext from "./userContext"
import { useState } from "react"

const UserState = (props) => {

    const user = {
        "name": "Dragonborn",
        "class": "4"
    }

    const [state, setState] = useState(user);

    const update = (e) => {
        setState(e)
    }

    return(
        <userContext.Provider value={{state, update}} >
            {props.children}
        </userContext.Provider>
    )
}
export default UserState;