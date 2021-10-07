import React from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import { logoDarkSvg } from 'src/assets/images';
import { userSvg, searchSvg } from 'src/assets/icons';
import { useAppDispatch, useAppSelector } from 'src/state/hooks';
import { userActions, userSelectors } from 'src/state/features/user';

interface HeaderProps {
}

const Header: React.FC<HeaderProps> = (props) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelectors.getUserData);
  const [dropdownHidden, setDropdownHidden] = React.useState<boolean>(true);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

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

  return (
    <StyledHeader>
      <Container>
        <Link to="/dashboard">
          <LogoImg src={logoDarkSvg} />
        </Link>
        <Navigation>
          <NavList>
            <ListItem>
              <StyledNavLink to="/dashboard">Dashboard</StyledNavLink>
            </ListItem>
            <ListItem>
              <StyledNavLink to="!#">Audience</StyledNavLink>
            </ListItem>
            <ListItem>
              <StyledNavLink to="!#">Pricing</StyledNavLink>
            </ListItem>
            <ListItem>
              <StyledNavLink to="!#">Prospecting</StyledNavLink>
            </ListItem>
            <ListItem>
              <StyledNavLink to="!#">Upgrade Membership</StyledNavLink>
            </ListItem>
          </NavList>
        </Navigation>
        <SearchWrapper>
          <SearchInput type="text" placeholder="Search" />
          <SearchIcon src={searchSvg} />
        </SearchWrapper>
        <User
          onClick={() => setDropdownHidden(false)}
          ref={dropdownRef}
        >
          <Avatar>
            <UserIcon src={userSvg} />
          </Avatar>
          <Username>{user.email}</Username>
          <Dropdown hidden={dropdownHidden}>
            <DropdownItem>Profile</DropdownItem>
            <DropdownItem>User Profile</DropdownItem>
            <DropdownItem>Users</DropdownItem>
            <DropdownItem red onClick={
              () => dispatch(userActions.logout())
            }>Log Out</DropdownItem>
          </Dropdown>
        </User>
      </Container>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  height: 80px;
  background-color: #D5F3FF;
`;

const Container = styled.div`
  max-width: 1340px;
  height: 100%;
  padding: 0 20px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoImg = styled.img`
  margin-right: 50px;
`;

const Navigation = styled.nav`
  flex: 1;
`;

const NavList = styled.ul`
  padding: 0;
  margin-right: 45px;
  list-style: none;
  display: flex;
`;

const ListItem = styled.li`
  margin-right: 28px;
  display: flex;
  align-items: center;

  &:last-child {
    margin-right: 0;
  }
`;

const StyledNavLink = styled(NavLink)<{ active?: boolean }>`
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
`;

const SearchWrapper = styled.div`
  position: relative;
  margin-right: 40px;
  flex-basis: 365px;
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
`;

const UserIcon = styled.img`
  width: 20px;
  opacity: 0.5;
`;

const Username = styled.p`
  font-family: 'Rubik', sans-serif;
  font-weight: 400;
  font-size: 12px;
  line-height: 150%;
  color: #122434;
  white-space: nowrap;
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
`;

export default Header;
