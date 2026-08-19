import './css/TaskbarIcon.css';

function TaskbarIcon({ appStr, pinned, active, handleClick }) {
    let taskbarIconClassName = "Taskbar";
    if (active) {
        taskbarIconClassName += " active-app";
    }
    if (pinned) {
        taskbarIconClassName += " pinned";
    }

    return (
        <div className={taskbarIconClassName} onClick={handleClick}>
            <img src={`/desktopicons/${appStr}-icon.png`} />
            {!pinned && <p>{appStr}</p>}

        </div>
    );
}


export default TaskbarIcon;