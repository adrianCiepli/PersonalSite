import './css/Icon.css'

function Icon({name, onDragStart, onDragOver, onDrop}) {
    return (
        <div className='Icon'
            onDragStart={onDragStart} onDragOver={onDragOver} onDrop={onDrop} tabIndex={0} draggable>
            <img src={`${name}-icon.png`} draggable={false} />
            <span>{name}</span>
        </div>
    );
}


export default Icon;