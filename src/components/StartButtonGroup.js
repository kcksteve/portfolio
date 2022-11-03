import { useEffect, useState } from "react"
import volumeOnLight from '../images/volume-on-light.png'
import volumeOnDark from '../images/volume-on-dark.png'
import volumeOffLight from '../images/volume-off-light.png'
import volumeOffDark from '../images/volume-off-dark.png'

const StartButtonGroup = ({ startAnim, playSfx, setPlaySfx, setShowLaunchBtn }) => {
    const [launchClasses, setLaunchClasses] = useState('launchBtns launchBtn launchBtnTransition');
    const [sfxClasses, setSfxClasses] = useState('launchBtns sfxBtn launchBtnTransition');
    const [buttonsActive, setButtonsActive] = useState(true);
    const [sfxImg, setSfxImg] = useState('Sfx')
    const [sfxIsHovered, setSfxIsHovered] = useState(false);

    useEffect(() => {
        if (playSfx) {
            if (sfxIsHovered) {
                setSfxImg(volumeOnDark);
            } else {
                setSfxImg(volumeOnLight);
            }
        } else {
            if (sfxIsHovered) {
                setSfxImg(volumeOffDark);
            } else {
                setSfxImg(volumeOffLight);
            }
        }
    }, [playSfx, sfxIsHovered])

    return (
        <div className={'launchBtnFadeAnim launchBtnGroup'}>
            <div
                className={launchClasses}
                onClick={
                    () => {
                        if (buttonsActive) {
                            setButtonsActive(false);
                            setLaunchClasses('launchBtns launchBtnExpand launchBtnTransition');
                            setSfxClasses('launchBtns sfxBtnShrink launchBtnTransition');
                            setTimeout(() => startAnim(), 1000);
                            setTimeout(() => setShowLaunchBtn(false), 2000);
                        }
                    }
                }>
                LAUNCH
            </div>
            <div
                className={sfxClasses}
                onClick={
                    () => {
                        if (buttonsActive) {
                            setPlaySfx(!playSfx);
                        }
                    }
                }
                onMouseEnter={
                    () => {
                        setSfxIsHovered(true);
                    }
                }
                onMouseLeave={
                    () => {
                        setSfxIsHovered(false);
                    }
                }
                >
                <img className='sfxBtnImg'  src={sfxImg} alt='mute icon'/>
            </div>
        </div>
    )
}

export default StartButtonGroup