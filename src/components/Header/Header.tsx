import React from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import { logoDarkSvg } from 'src/assets/images';
import { userSvg, searchSvg, MenuIcon, XIcon } from 'src/assets/icons';
import { useAppDispatch, useAppSelector } from 'src/state/hooks';
import { userActions, userSelectors } from 'src/state/features/user';
import device from 'src/constants/devices';

interface HeaderProps {
  searchInputVisible?: boolean;
}

const Header: React.FC<HeaderProps> = ({ searchInputVisible = true }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelectors.getUserData);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const [dropdownHidden, setDropdownHidden] = React.useState<boolean>(true);
  const [isSideMenuVisible, setIsSideMenuVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      const element = dropdownRef.current;
      const target = event.target as Node;
      if (element && !element.contains(target)) {
        setDropdownHidden(true);
      }
    }
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  React.useEffect(() => {
    if (isSideMenuVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isSideMenuVisible]);

  return (
    <StyledHeader>
      <Container>
        <Link to="/dashboard">
          <LogoImg src={logoDarkSvg} />
        </Link>
        <SideMenuBackground
          isVisible={isSideMenuVisible}
          onClick={() => setIsSideMenuVisible(false)}
        />
        <Menu isVisible={isSideMenuVisible}>
          <CloseMenuBtn onClick={() => setIsSideMenuVisible(false)}>
            <XIcon />
          </CloseMenuBtn>
          <Navigation>
            <NavList>
              <ListItem>
                <StyledNavLink to="/dashboard">Dashboard</StyledNavLink>
              </ListItem>
              <ListItem>
                <StyledNavLink to="/search">Search</StyledNavLink>
              </ListItem>
              <ListItem>
                <StyledNavLink to="/prospects">Prospecting</StyledNavLink>
              </ListItem>
              <ListItem>
                <StyledNavLink to="/favourites">Favourites</StyledNavLink>
              </ListItem>
            </NavList>
          </Navigation>
          {searchInputVisible && (
            <SearchWrapper>
              <SearchInput type="text" placeholder="Search" />
              <SearchIcon src={searchSvg} />
            </SearchWrapper>
          )}
          <User
            onClick={() => setDropdownHidden(false)}
            ref={dropdownRef}
          >
            <Avatar>
              <UserIcon src={userSvg} />
            </Avatar>
            {user && <Username>{user.email}</Username>}
            <Dropdown hidden={dropdownHidden}>
              <DropdownItem>Profile</DropdownItem>
              <DropdownItem>User Profile</DropdownItem>
              <DropdownItem>Users</DropdownItem>
              <DropdownItem red onClick={
                () => dispatch(userActions.logout())
              }>Log Out</DropdownItem>
            </Dropdown>
          </User>
        </Menu>
        <Hamburger onClick={() => setIsSideMenuVisible(true)}>
          <MenuIcon />
        </Hamburger>
      </Container>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  height: 80px;
  background-color: #D5F3FF;

  @media ${device.mobileM} {
    height: 74px;
  }
`;

const Container = styled.div`
  max-width: 1340px;
  height: 100%;
  padding: 0 20px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media ${device.tablet} {
    padding: 0 32px;
  }

  @media ${device.mobileM} {
    padding: 0 16px;
  }
`;

const LogoImg = styled.img`
  margin-right: 50px;
  
  @media ${device.mobileM} {
    height: 30px;
  }
`;

const SideMenuBackground = styled.div<{ isVisible?: boolean }>`
  @media ${device.tablet} {
    display: ${props => props.isVisible ? 'block' : 'none'};
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 98;
    transition: display 0.2s;
  }

  @media ${device.mobileM} {
    display: none;
  }
`;

const Menu = styled.div<{ isVisible?: boolean }>`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: right 0.2s;

  @media ${device.tablet} {
    padding: 132px 40px 32px 40px;
    position: fixed;
    top: 0;
    right: ${props => props.isVisible ? 0 : '-330px'};
    width: 330px;
    height: 100%;
    background-color: #FFFFFF;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    z-index: 99;
  }

  @media ${device.mobileM} {
    width: 100%;
    right: ${props => props.isVisible ? 0 : '-100%'};
  }
`;

const CloseMenuBtn = styled.div`
  display: none;
  position: absolute;
  top: 28px;
  right: 32px;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.6;
  }

  @media ${device.tablet} {
    display: block;
  }
`;

const Navigation = styled.nav`
  flex: 1;
`;

const NavList = styled.ul`
  padding: 0;
  margin-right: 45px;
  list-style: none;
  display: flex;

  @media ${device.tablet} {
    flex-direction: column;
    margin: 0;
  }
`;

const ListItem = styled.li`
  margin-right: 28px;
  display: flex;
  align-items: center;

  &:last-child {
    margin-right: 0;
  }

  @media ${device.tablet} {
    &:not(:last-child) {
      margin-bottom: 32px;
    }
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  white-space: nowrap;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #122434;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }

  &.active {
    font-weight: 500;
  }

  @media ${device.tablet} {
    font-size: 16px;
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  margin-right: 40px;
  flex-basis: 365px;

  @media ${device.laptopM} {
    display: none;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 36px;
  padding: 9px 40px 9px 24px;
  background: #F3FCFF;
  border-radius: 6px;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #122434;
  border: 1px solid #F3FCFF;

  &:focus {
    outline: none;
    border: 1px solid #2BAEE0;
  }
`;

const SearchIcon = styled.img`
  position: absolute;
  top: 6px;
  right: 20px;
  opacity: 0.5;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
`;

const User = styled.div`
  min-width: 177px;
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;

  @media ${device.laptop} {
    min-width: 160px;
  }
`;

const Avatar = styled.div`
  margin-right: 12px;
  width: 36px;
  height: 36px;
  background-color: #FFFFFF;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  @media ${device.tablet} {
    border: 1px solid #dbdbdb;
  }
`;

const UserIcon = styled.img`
  width: 20px;
  opacity: 0.5;
`;

const Username = styled.p`
  margin: 0;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #122434;
  white-space: nowrap;

  @media ${device.tablet} {
    font-size: 16px;
  }
`;

const Dropdown = styled.div<{ hidden?: boolean }>`
  display: ${props => props.hidden ? 'none': 'block'};
  min-width: 177px;
  padding: 17px 0;
  position: absolute;
  left: 0;
  top: 50px;
  background-color: #FFFFFF;
  box-shadow: 0px 2px 20px rgba(40, 31, 61, 0.04);
  border-radius: 6px;
  cursor: default;
  z-index: 100;

  @media ${device.laptop} {
    min-width: 150px;
  }

  @media ${device.tablet} {
    top: unset;
    bottom: 50px;
    box-shadow: 0px 2px 20px rgba(40, 31, 61, 0.1);
  }
`;

const DropdownItem = styled.div<{ red?: boolean }>`
  padding: 7px 24px;
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: ${props => props.red ? '#F05658' : '#122434'};
  transition: background-color 0.2s;
  cursor: pointer;

  &:hover {
    background-color: #f8f8f8;
  }

  @media ${device.tablet} {
    font-size: 14px;
  }
`;

const Hamburger = styled.div`
  display: none;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.6;
  }

  @media ${device.tablet} {
    display: block;
  }

  @media ${device.mobileM} {
    display: block;
  }
`;

export default Header;
