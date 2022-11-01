const StartButtonGroup = ({ startAnim, playSfx, setPlaySfx }) => {
    const divStyle = {
        position: 'absolute',
        width: '400px',
        height: '50px',
        top: '50%',
        left: '50%',
        marginTop: '-25px',
        marginLeft: '-200px'
    }

    const launchBtnStyle = {
        width: '80%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'rgba(255,255,255,255)',
        border: '2px solid',
        fontSize: '20px'
    }

    const sfxBtnStyle = {
        width: '18%',
        height: '100%',
        marginLeft: '2%',
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'rgba(255,255,255,255)',
        border: '2px solid'
    }

    return (
        <div style={divStyle}>
            <button className='launchBtns launchBtn' onClick={startAnim}>
                LAUNCH
            </button>
            <button className='launchBtns sfxBtn' onClick={() => {setPlaySfx(!playSfx)}}>
                {playSfx ? 'Sfx' : 'No Sfx'}
            </button>
        </div>
    )
}

export default StartButtonGroup