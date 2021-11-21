import * as React from 'react';
import {Link} from 'gatsby';
import styled from 'styled-components';
import Container from './container';


const StyledHeader = styled.header`
    background-position: 50%;
    background-size: cover;
    padding-bottom: 20px;
    padding-top: 20px;
    color: #fff;
`;


const StyledNav = styled.nav`
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin: 15px 0 0;
`;

const StyledNavLink = styled(Link)`
    color: #000;
    display: inline-block;
    opacity: .7;
    padding: 5px 10px;
    text-decoration: none;
`;


const Layout = ({ pageTitle, children }) => {
    return (
        <div>
            <StyledHeader>
                <Container>
                    <title>{pageTitle}</title>
                    <StyledNav>
                        <div>
                            <StyledNavLink to="/">Home</StyledNavLink>
                            <StyledNavLink to="/about">About</StyledNavLink>
                        </div>

                        <div>
                            <StyledNavLink to="/contributors">Contributors</StyledNavLink>
                        </div>
                    </StyledNav>
                </Container>
            </StyledHeader>
            


            <main>
                <h1>{pageTitle}</h1>
                {children}
            </main>
        </div>
    )
}


export default Layout;