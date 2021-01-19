import react, { useEffect } from 'react';
import { HeaderContainer, NavButton } from './HeaderStyles';
import { Link } from 'react-router-dom';
import { ReactComponent as BookIcon } from '../../icons/book.svg';
import { ReactComponent as ImageIcon } from '../../icons/image.svg';
import { useLocation } from 'react-router-dom'

const Header = () => {
    const location = useLocation();

    const isMediaPath = () => {
        return /media/.test(location.pathname);
    }

    return (
        <HeaderContainer>
            <NavButton active={!isMediaPath()}>
                <Link to='/admin'>
                    <BookIcon />
                    Content
                </Link>
            </NavButton>
            <NavButton active={isMediaPath()}>
                <Link to='/admin/media'>
                    <ImageIcon />
                    Media
                </Link>
            </NavButton>
        </HeaderContainer>
    )
};

export default Header;