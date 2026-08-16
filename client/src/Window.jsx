import { useState, useEffect, useRef } from "react";
import Topbar from './Topbar.jsx';
import './css/Window.css'


function Window({ index, appNameStr, errorText='', actives, setActives }) {
    const DEFAULTDIMENSIONS = appNameStr!=='Error' ? {width:1000, height:700} : {width:500, height:150};
    const [dimensions, setDimensions] = useState(DEFAULTDIMENSIONS);
    const defX = (window.innerWidth / 2) - (dimensions.width / 2);
    const defY = (window.innerHeight / 2) - (dimensions.height / 2);
    const [coords, setCoords] = useState({x:defX, y:defY});
    const [hasFocus, setHasFocus] = useState(false);
    const windowElem = useRef(null);

    if (appNameStr === 'Error') {
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
                            DEFAULTDIMENSIONS={DEFAULTDIMENSIONS} dimensions={dimensions} setDimensions={setDimensions} actives={actives} setActives={setActives} />
                <div className="content-border">
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
                        DEFAULTDIMENSIONS={DEFAULTDIMENSIONS} setDimensions={setDimensions} actives={actives} setActives={setActives} />
            <div className="content-border">
                <div className="content-area">

                </div>
            </div>
        </div>
    );
}


export default Window;