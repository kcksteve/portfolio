const MainPage = ({ setCurrentPage }) => {
    return(
        <div className='mainPage'>
            <div className='nameDiv nameGrowAnim'>
            <div>
                STEPHEN<br/>KRAWCZYK<br/>
                <div className='nameTitle nameTitleFade'>SOFTWARE DEVELOPER</div>
                <div className='nameTitle2 nameTitleFade2'>WEB + GAMES</div>
                <div className='nameBtn nameBtnFade'
                    onClick={() => setCurrentPage(1)}
                >
                LEARN MORE?
                </div>
            </div>
        </div>
        </div>
    )
}

export default MainPage;