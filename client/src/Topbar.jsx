import { useState, useEffect } from "react";
import './css/Topbar.css';

function Topbar({ index, appNameStr, coords, setCoords, setHasFocus, hasFocus, windowElem, DEFAULTDIMENSIONS, setDimensions, actives, setActives }) {
    const [isDragging, setDragging] = useState(false);
    const [mouseWindowOffset, setMouseWindowOffset] = useState({x: 0, y: 0});
    const [maximized, setMaximized] = useState(false);

    const handleMouseDown = (e) => {
        setHasFocus(true);
        if (!maximized) {
            setDragging(true);
            const xOffset = e.clientX - coords.x;
            const yOffset = e.clientY - coords.y;
            setMouseWindowOffset({x:xOffset, y:yOffset});
        }
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        }
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging]);

    const handleMouseMove = (e) => {
        const newX = e.clientX - mouseWindowOffset.x;
        const newY = e.clientY - mouseWindowOffset.y;
        windowElem.current.style.left = `${newX}px`;
        windowElem.current.style.top = `${newY}px`;
    };

    const handleMouseUp = (e) => {
        const newX = e.clientX - mouseWindowOffset.x;
        const newY = e.clientY - mouseWindowOffset.y;
        setDragging(false);
        setCoords({x:newX, y:newY});
    };

    const handleMaximize = () => {
        if (maximized) {
            setDimensions(DEFAULTDIMENSIONS); // happens a bit later on a scheduled re-render, so the state variable may be stale
            const defX = (window.innerWidth / 2) - (DEFAULTDIMENSIONS.width / 2); // compare against a known value, not the state variable
            const defY = (window.innerHeight / 2) - (DEFAULTDIMENSIONS.height / 2);
            setCoords({x:defX, y:defY});
        } else {
            setDimensions({width:'100%', height:'95vh'}); // Taskbar height is 5vh
            setCoords({x:0, y:0});
        }
        setMaximized(!maximized);
    }

    const handleClose = () => {
        // Remove by own index from the list of actives via setActives and splicing
        // as of now, the index attribute is not necessary, however may prove useful for more complex functionality
        let newArr = [...actives];
        newArr.splice(index, 1);
        setActives(newArr);
    }

    return (
        <div className={hasFocus ? "Topbar in-focus" : "Topbar"} onMouseDown={handleMouseDown}>
            <p className="window-name">{appNameStr}</p>
            <div className="button-area">
                {appNameStr!=='Error' && <span className="minimize-button">_</span>}
                {appNameStr!=='Error' && <span className="maximize-button" onClick={handleMaximize}>{maximized ? '⧉' : '🗖'}</span>}
                <span className="close-button" onClick={handleClose}>X</span>
            </div>
        </div>
    );
}


export default Topbar;