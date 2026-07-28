import './css/Desktop.css'
import Icon from './Icon.jsx';


function Desktop() {
    const desktopApps = ["Mail", "Education", "About", "Portfolio", "Recycle", "Explorer", "Mobdle"];
    const gridSize = 10*18; // rows * cols
    let gridItems = [];

    for (let i=0; i<gridSize; i++) {
        if (i < desktopApps.length) {
            gridItems.push(desktopApps[i]);
        } else {
            gridItems.push(null);
        }
    }

    return (
        <div className='Desktop'>
            {gridItems.map((desktopItem, index) => {
                if (desktopItem !== null) {
                    return <Icon key={index} name={desktopItem} />
                } else {
                    return <div key={index}></div>
                }
            })}
        </div>
    );
}


export default Desktop;