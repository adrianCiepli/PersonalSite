import { createContext } from "react";

export const WindowContext = createContext();

export default function WindowContextComponent({ activeWindows, setActiveWindows, activeErrors, setActiveErrors, children }) {
    

    return (
        <WindowContext activeWindows={activeWindows} setActiveWindows={setActiveWindows} activeErrors={activeErrors} 
                setActiveErrors={setActiveErrors}>
            {children}
        </WindowContext>
    );
}
