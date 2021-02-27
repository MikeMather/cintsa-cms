import React, { useEffect } from 'react';
import { GlobalActionsContainer, HeaderContainer, NavButton, NavContainer } from './HeaderStyles';
import { Link, useLocation, useHistory } from 'react-router-dom';
import BookIcon from '../../icons/book.svg';
import ImageIcon from '../../icons/image.svg';
import CloseIcon from '../../icons/close.svg';
import SettingsIcon from '../../icons/settings.svg';
import ArrowLeft from '../../icons/arrowLeft.svg';

const Header = (): JSX.Element => {
    const location = useLocation();
    const history = useHistory();

    const isPath = (regex: RegExp): boolean => {
        return regex.test(location.pathname);
    }

    const isSubPath = (): boolean => {
        return /pieces\/.*\/.*/.test(location.pathname)
    }

    const close = (e: React.MouseEvent<HTMLElement>): void => {
        history.push('/');
    }

    return (
        <HeaderContainer>
            <NavContainer>
                {/* <NavButton active={false}>
                    {isSubPath() && 
                        <a onClick={e => history.goBack()} >
                            <ArrowLeft />
                        </a>
                    }
                </NavButton> */}
                <NavButton active={isPath(/pieces/)}>
                    <Link to='/admin/pieces'>
                        <BookIcon />
                        Pieces
                    </Link>
                </NavButton>
                <NavButton active={isPath(/media/)}>
                    <Link to='/admin/media'>
                        <ImageIcon />
                        Media
                    </Link>
                </NavButton>
                <NavButton active={isPath(/settings/)}>
                    <Link to='/admin/settings'>
                        <SettingsIcon />
                        Settings
                    </Link>
                </NavButton>
            </NavContainer>
            <GlobalActionsContainer>
                <CloseIcon width={25} onClick={close} />
            </GlobalActionsContainer>
        </HeaderContainer>
    )
};

export default Header;