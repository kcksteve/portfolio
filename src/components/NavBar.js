import NavBarButton from "./NavBarButton";

const NavBar = ({ setCurrentPage }) => {
    return (
        <div className='navBar navbarFade'>
            <NavBarButton name='ABOUT' pageId={1} setCurrentPage={setCurrentPage}/>
            <NavBarButton name='PROJECTS' pageId={2} setCurrentPage={setCurrentPage}/>
            <NavBarButton name='CONTACT' pageId={3} setCurrentPage={setCurrentPage}/>
        </div>
    )
}

export default NavBar;