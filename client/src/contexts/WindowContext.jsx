import { createContext } from "react";

export const WindowContext = createContext(null);

function WindowContextComponent({ activeWindows, setActiveWindows, activeErrors, setActiveErrors, children }) {
    return (
        <WindowContext value={{activeWindows, setActiveWindows, activeErrors, setActiveErrors}}>
            {children}
        </WindowContext>
    );
}
export default WindowContextComponent;
