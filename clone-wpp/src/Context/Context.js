import React from "react";
import { theme } from "../Utils";

const GlobalContext = React.createContext({
    theme,
    rooms: [],
    unfilteredRooms: [],
    setUnfilteredRooms: () => {},
    setRooms: () => {}
});

export default GlobalContext;