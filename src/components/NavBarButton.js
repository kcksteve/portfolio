const NavBarButton = ({ name, pageId, setCurrentPage }) => {
    return (
        <div className='navBarButton' onClick={() => {
        setCurrentPage(pageId);
        }}
        >
            {name}
        </div>
    )
}

export default NavBarButton;