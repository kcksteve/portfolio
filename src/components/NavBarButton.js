const NavBarButton = ({ name, pageId, setCurrentPage }) => {
    return (
        <div className='navBarButton' onClick={() => {
        setCurrentPage(pageId);
        console.log('pageId');
        }}>
            {name}
        </div>
    )
}

export default NavBarButton;