import "./css/Taskbar.css";
import windows_icon from './assets/windows_icon.png';
import Tray from './Tray.jsx';

function Taskbar() {
    return (
        <div className="Taskbar">
            <div className="start button">
                <img src={windows_icon} />
                <p>start</p>
            </div>

            <div className="app-tray">

            </div>

            <Tray />
        </div>
    );
}


export default Taskbar;