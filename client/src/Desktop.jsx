import { useState } from 'react';
import './css/Desktop.css'
import Icon from './Icon.jsx';
import Window from './Window.jsx';


function Desktop() {
    const appsToHave = ["Mail", "Education", "About", "Portfolio", "Recycle", "Explorer", "Notepad", "Firefox", "Mobdle", "Photos"];
    const gridSize = 8*16; // rows * cols
    const [desktopApps, setDesktopApps] = useState([...appsToHave, ...Array(gridSize - appsToHave.length).fill(null)]);
    const [activeWindows, setActiveWindows] = useState(['Window']);
    const [activeErrorTexts, setActiveErrorTexts] = useState([]); // Stores error text?
    const MAXWINDOWS = 1;

    const [draggingIndex, setDraggingIndex] = useState(null);

    const handleDragStart = (e, index) => {
        // This is called by the element we mousedown and hold on
        setDraggingIndex(index);
        e.target.focus();
    };

    const handleDragOver = (e) => {
        // This is called by every element we hover over, each has a default that specifically says we do not accept dropping item behaviour, just cancels out
        // This handler specifically exists to override this behaviour, set the flag to off BEFORE we drop many times per second as we hover over the element
        // This also has to do with how when you drag it'll give you a symbol on whether you can drop here BEFORE you drop, so we prevent default to remove the default NO
        // There are also architectural reasons why we figure out whether an element is droppable onto before the drop happens, as seen here
        // And we must run the dragOver constantly over and over per second to ensure constant monitoring of position and all that stuff
        if (draggingIndex !== null) { // does not trigger if something without a dragStart handler drags onto this element
            e.preventDefault(); 
        }
    };

    const handleDrop = (index) => {
        // Is called by the element we drop on to
        const draggingItem = desktopApps[draggingIndex];
        const droppedOnItem = desktopApps[index];
        const newDesktopApps = [... desktopApps];
        // arr.splice(startIndex, deleteAmount, insertItem1, insertItem2, ...)
        // Takes arr, starting at startIndex (inclusive), delete deleteAmount-items, starting at that same index insert inserItems
        newDesktopApps.splice(index, 1, draggingItem);
        newDesktopApps.splice(draggingIndex, 1, droppedOnItem);
        setDesktopApps(newDesktopApps);
        setDraggingIndex(null);
    };

    const handleDoubleClick = (appStr) => {
        if (activeWindows.length >= MAXWINDOWS) {
            const newArr = [... activeErrorTexts, `Your RAM is too teeny-tiny, you can only have ${MAXWINDOWS} active window(s) at once.`]
            setActiveErrorTexts(newArr);
        } else {
            const newArr = [... activeWindows, appStr];
            setActiveWindows(newArr);
        }
    };

    return (
        <div className='Desktop'>
            {desktopApps.map((desktopApp, index) => {
                if (desktopApp !== null) {
                    return <Icon key={index} name={desktopApp} handleDragStart={(e) => {handleDragStart(e, index)}} handleDragOver={handleDragOver} 
                                handleDrop={() => {handleDrop(index)}} handleDoubleClick={() => {handleDoubleClick(desktopApp)}} draggable/>
                } else {
                    return <div key={index} onDragOver={handleDragOver} onDrop={() => {handleDrop(index)}}></div>
                }
            })}

            {activeWindows.map((window, index) => {
                return <Window key={index} index={index} appNameStr={window} actives={activeWindows} setActives={setActiveWindows} />
            })}
            
            {activeErrorTexts.map((errorText, index) => {
                return <Window key={index} index={index} appNameStr={'Error'} errorText={errorText} actives={activeErrorTexts} setActives={setActiveErrorTexts} />
            })}
        </div>
    );
}


export default Desktop;