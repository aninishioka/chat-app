import { createContext } from "react";

const self = "63ca28374d1ee7c2e07c22d6";
//const self = "63c8b842482a19d579b5910c";
const UserContext = createContext(self);
const user = false;

export { user, self, UserContext };
