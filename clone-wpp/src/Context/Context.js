import React from "react";
import { theme } from "../Utils";

const GlobalContext = React.createContext({
    theme,
    rooms: [],
    setRooms: () => {}
});

export default GlobalContext;