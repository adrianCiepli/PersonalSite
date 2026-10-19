import { useState, useEffect, useRef, useContext } from "react";
import { WindowContext } from "./contexts/WindowContext.jsx";
import './css/Window.css'
import './css/Topbar.css';


function Topbar({ index, appNameStr, coords, setCoords, setHasFocus, hasFocus, windowElem, DEFAULTDIMENSIONS, setDimensions, actives, setActives, topbarRef }) {
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
        <div className={hasFocus ? "Topbar in-focus" : "Topbar"} onMouseDown={handleMouseDown} ref={topbarRef}>
            <p className="window-name">{appNameStr}</p>
            <div className="button-area">
                {appNameStr!=='Error' && <span className="minimize-button">_</span>}
                {appNameStr!=='Error' && <span className="maximize-button" onClick={handleMaximize}>{maximized ? '⧉' : '🗖'}</span>}
                <span className="close-button" onClick={handleClose}>X</span>
            </div>
        </div>
    );
}


function Window({ index, appNameStr, errorText=''}) {
    const {activeWindows, setActiveWindows, activeErrors, setActiveErrors} = useContext(WindowContext);
    const DEFAULTDIMENSIONS = appNameStr!=='Error' ? {width:1000, height:700} : {width:500, height:150};
    const [dimensions, setDimensions] = useState(DEFAULTDIMENSIONS);
    const defX = (window.innerWidth / 2) - (dimensions.width / 2);
    const defY = (window.innerHeight / 2) - (dimensions.height / 2);
    const [coords, setCoords] = useState({x:defX, y:defY});
    const [hasFocus, setHasFocus] = useState(false);
    const windowElem = useRef(null);

    // This only is useful in the Error if statement
    const flashTimerRef = useRef(null);
    const topbarRef = useRef(null);
    const windowContentBorderRef = useRef(null);

    // Run on unmount if user closes flashing error
    useEffect(() => {
        windowElem.current.focus();
        // Cleanup function only runs BEFORE a new call caused by change in dependencies with old values, or on component unmount
        return () => {
            if (flashTimerRef.current) {
                clearTimeout(flashTimerRef.current);
            }
        }
    }, []);

    if (appNameStr === 'Error') {
        // DO NOT let the user live with their errors, they must address them first mwehehehe >:)
        const notAllowedBlur = (e) => {
            e.target.focus();
            // If they manage to fire this multiple times in a row, do not let the Ref get overwritten because then it never clears
            if (flashTimerRef.current) {
                clearTimeout(flashTimerRef.current);
            }
            // Give a flashing style for like 1 second and disable the close button during, to not let user close during timeout
            const prevBorderClassname = windowContentBorderRef.current.className;
            const prevTopbarClassname = topbarRef.current.className;
            if (!windowContentBorderRef.current.className.includes('flashing-window')) {
                // In case they fire again while there was already a timer going unfinished
                windowContentBorderRef.current.className += ' flashing-window';
                topbarRef.current.className += ' flashing-window';
            }
            let timer = setTimeout(() => {
                windowContentBorderRef.current.className = prevBorderClassname;
                topbarRef.current.className = prevTopbarClassname;
            }, 2000);
            flashTimerRef.current = timer;
        }

        return (
            <div className="Window" tabIndex={1} ref={windowElem} 
                onFocus={() => {setHasFocus(true)}} 
                // onBlur={() => {setHasFocus(false)}}
                onBlur={(e) => {notAllowedBlur(e)}}
                style={{
                    left: coords.x,
                    top: coords.y,
                    width: dimensions.width,
                    height: dimensions.height,
                }}
            >
                <Topbar appNameStr={appNameStr} coords={coords} setCoords={setCoords} setHasFocus={setHasFocus} hasFocus={hasFocus} windowElem={windowElem} 
                            DEFAULTDIMENSIONS={DEFAULTDIMENSIONS} dimensions={dimensions} setDimensions={setDimensions} 
                            actives={activeErrors} setActives={setActiveErrors} topbarRef={topbarRef} />
                <div className="content-border" ref={windowContentBorderRef}>
                    <div className="content-area error">
                        <p>{errorText}</p>
                    </div>
                </div>
            </div>
            
        );
    }

    return (
        <div className="Window" tabIndex={1} ref={windowElem} onFocus={() => {setHasFocus(true)}} onBlur={() => {setHasFocus(false)}}
            style={{
                left: coords.x,
                top: coords.y,
                width: dimensions.width,
                height: dimensions.height,
            }}
        >
            <Topbar index={index} appNameStr={appNameStr} coords={coords} setCoords={setCoords} setHasFocus={setHasFocus} hasFocus={hasFocus} windowElem={windowElem} 
                        DEFAULTDIMENSIONS={DEFAULTDIMENSIONS} setDimensions={setDimensions} actives={activeWindows} setActives={setActiveWindows} />
            <div className="content-border">
                <div className="content-area">

                </div>
            </div>
        </div>
    );
}


export default Window;