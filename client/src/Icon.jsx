import './css/Icon.css'

function Icon({name}) {
    return (
        <div className='Icon'>
            <img src={`${name}-icon.png`} />
            <span>{name}</span>
        </div>
    );
}


export default Icon;