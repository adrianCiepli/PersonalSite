import './css/Icon.css'

function Icon({name, handleDragStart, handleDragOver, handleDrop, handleDoubleClick}) {
    return (
        <div className='Icon'
            onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop} onDoubleClick={handleDoubleClick} tabIndex={0} draggable>
            <img src={`${name}-icon.png`} draggable={false} />
            <span>{name}</span>
        </div>
    );
}


export default Icon;