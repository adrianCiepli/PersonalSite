import './css/TaskbarIcon.css';

function TaskbarIcon({ appStr, pinned, handleClick }) {

    return (
        <div className={pinned ? "TaskbarIcon pinned" : "TaskbarIcon"} onClick={handleClick}>
            <img src={`${appStr}-icon.png`} />
            {!pinned && <p>{appStr}</p>}
        </div>
    );
}


export default TaskbarIcon;