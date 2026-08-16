
function TaskbarIcon({ appName, active }) {
    return (
        <div className={active ? "TaskbarIcon active-app" : "TaskbarIcon"}>
            <img src={`/desktopicons/${appname}-icon.png`} />
        </div>
    );
}


export default TaskbarIcon;