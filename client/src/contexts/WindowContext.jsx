import { createContext, useState } from "react";

export const WindowContext = createContext(null);

// Opening too many apps - error: 1
const MAXWINDOWS = 1;

function WindowContextComponent({ children }) {
    // Window could also be honestly more appropriately named a 'Process'
    const [activeWindows, setActiveWindows] = useState([]); // Stores {index: <Int>, appStr: <String>}
    const [activeError, setActiveError] = useState(null); // Stores {error: <String>,errorText: <String>}, or null when no error is open. Only one at a time

    const openError = (error) => {
        setActiveError(error);
    };

    const closeError = () => {
        // Only one error can exist at a time, so closing it just clears it
        setActiveError(null);
    };

    const openWindow = (appStr) => {
        if (activeWindows.length >= MAXWINDOWS) {
            openError({error: 1, errorText: `Your RAM is too teeny-tiny, you can only have ${MAXWINDOWS} active window(s) at once.`});
        } else {
            const newArr = [... activeWindows, {index: activeWindows.length, appStr: appStr}];
            setActiveWindows(newArr);
        }
    };

    const closeWindow = (index) => {
        // Remove by own index from the list of activeWindows via setActiveWindows and splicing
        // as of now, the index attribute is not necessary, however may prove useful for more complex functionality
        let newArr = [...activeWindows];
        newArr.splice(index, 1);
        setActiveWindows(newArr);
    };

    return (
        <WindowContext value={{activeWindows, activeError, openWindow, closeWindow, openError, closeError}}>
            {children}
        </WindowContext>
    );
}
export default WindowContextComponent;
