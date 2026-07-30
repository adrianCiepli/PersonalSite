import { useState, useEffect } from "react";
import antivirusImg from './assets/Antivirus.png';
import discImg from './assets/Disc.png';
import microphoneImg from './assets/Microphone.png';
import mailNotifImg from './assets/MailNotif.png';
import canadaImg from './assets/Canada.png';
import audioImg from './assets/Audio.png';
import cableImg from './assets/Cable.png';
import printerImg from './assets/Printer.png';
import './css/Tray.css';

const dateFormatter = new Intl.DateTimeFormat(undefined, {year: "numeric", month: "2-digit", day: "2-digit"}); // undefined to default to user locale
const timeFormatter = new Intl.DateTimeFormat(undefined, {hour: "numeric", minute: "numeric", hour12: true});

function formatTime(date) {
    let time = timeFormatter.format(date);
    time = time.toUpperCase().replaceAll('\.', '');
    return time;
}

function Tray() {
    const [displayDate, setDisplayDate] = useState(dateFormatter.format(new Date()));
    const [displayTime, setDisplayTime] = useState(formatTime(new Date()));

    useEffect (() => {
        const intervalId = setInterval(() => {
            const now = new Date();
            setDisplayDate(dateFormatter.format(now));
            setDisplayTime(formatTime(now));
        }, 1000)

        return () => {clearInterval(intervalId);} 
        // useEffect always return func, runs before the effect fires again (dependency array) or component unMount (removal of Tray)
    }, []);

    return (
        <div className="Tray">
            <img src={antivirusImg} />
            <img src={discImg} />
            <img src={microphoneImg} />
            <img src={mailNotifImg} />
            <img src={canadaImg} />
            <img src={audioImg} />
            <img src={cableImg} />
            <img src={printerImg} />
            <div className="date-time-area">
                <p>{displayTime}</p>
                <p>{displayDate}</p>
            </div>
        </div>
    );
}


export default Tray;