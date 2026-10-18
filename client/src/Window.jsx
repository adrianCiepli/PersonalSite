import { useState, useEffect, useRef, useContext } from "react";
import Topbar from './Topbar.jsx';
import WindowContext from "./contexts/WindowContext.jsx";
import './css/Window.css'


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
    const contentAreaRef = useRef(null);

    // Run on unmount if user closes flashing error
    useEffect(() => {
        // Cleanup function only runs BEFORE a new call caused by change in dependencies with old values, or on component unmount
        return () => {
            if (flashTimerRef.current) {
                clearTimeout(flashTimerRef.current);
            }
        }
    }, []);

    if (appNameStr === 'Error') {
        // DO NOT let the user live with their errors, they must address them first mwehehehe >:)
        const notAllowedBlur = () => {
            // Give a flashing style for like 1 second and disable the close button during, to not let user close during timeout
            const prevBorderClassname = contentAreaRef.current.className;
            const prevTopbarClassname = topbarRef.current.className;
            contentAreaRef.current.className += ' flashing-window';
            topbarRef.current.className += ' flashing-window';

            let timer = setTimeout(() => {
                contentAreaRef.current.className = prevBorderClassname;
                topbarRef.current.className = prevTopbarClassname;
            }, 2000);
            flashTimerRef.current = timer;
        }

        

        return (
            <div className="Window" tabIndex={1} ref={windowElem} 
                onFocus={() => {setHasFocus(true)}} 
                onBlur={() => {setHasFocus(false)}}
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
                <div className="content-border">
                    <div className="content-area error" ref={contentAreaRef}>
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