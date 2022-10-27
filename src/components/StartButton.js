import { Button } from "react-bootstrap"

const StartButton = ({ startAnim }) => {
    return (
        <button
        style={{
            position: 'absolute',
            width: '200px',
            height: '50px',
            top: '50%',
            left: '50%',
            marginTop: '-25px',
            marginLeft: '-100px'
        }}
        onClick={startAnim}
        >Launch</button>
    )
}

export default StartButton