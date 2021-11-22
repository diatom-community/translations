import * as React from 'react';
import "../index.css"

import { LocalizedLink as Link } from "gatsby-theme-i18n"
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components';
import Container from './container';
import HeaderImageSrc from "../images/diatom_header.jpg"
import { useLocalization, LocalesList } from "gatsby-theme-i18n"
import { Link as RawLink } from "gatsby";

import DiatomDaoLogo from '../images/diatom_logo.png'

const StyledHeader = styled.header`
    background: url(${HeaderImageSrc});
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
    color: #fff;
    display: inline-block;
    opacity: .7;
    padding: 5px 10px;
    text-decoration: none;
`;

const StyledRawLink = styled(RawLink)`
    color: #fff;
    display: inline-block;
    opacity: .7;
    padding: 5px 10px;
    text-decoration: none;
`

// todo: responsiveness?
// todo: clean this up and split into multiple methods/components
// todo: facelift


const StyledTopNavWrapper = styled.div`
    height: 50px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;


    > img {
        height: 100%;
        width: auto;
        flex-grow: 0;
    }

    a {
        color: #fff;
        display: inline-block;
        opacity: .7;
        padding: 5px 10px;
        text-decoration: none;
    }

`;


const TopNavigation = ({}) => {

    return (
        <StyledTopNavWrapper>
            <Logo />

            <div>
                <a href="https://discord.gg/aXyGv9YPAC">discord</a>
                <a href="https://twitter.com/diatomdao">twitter</a>
            </div>
        </StyledTopNavWrapper>
    )
}


const StyledBannerText = styled.div`
    text-align: center;
    padding: 8vh 0;


`


const Logo = () => {
    return (
        <img src={DiatomDaoLogo} alt="Diatom Dao Logo" />
    )

}

const Layout = ({ pageTitle, children, location}) => {
    const data = useStaticQuery(graphql`
        query {
        site {
            siteMetadata {
            title
            }
        }
        }
    `);

    const { locale: currentLocale, config } = useLocalization()

    const localeSelect = config.map(locale => (
        <StyledRawLink key={`locale-${locale.code}`} to={location.pathname.replace(currentLocale, locale.code)}>
            {locale.code}
        </StyledRawLink>
    ))

    return (
        <div>
            <StyledHeader>
                <Container>
                    <TopNavigation />
                    <StyledBannerText>
                        <h1>{data.site.siteMetadata.title}</h1>
                        <h2>{pageTitle}</h2>

                    </StyledBannerText>
                    <StyledNav>
                        <div>
                            <StyledNavLink to="/">Home</StyledNavLink>
                            <StyledNavLink to="/contributors">contribute how?</StyledNavLink>
                            <StyledNavLink to="/content">Content</StyledNavLink>
                        </div>

                        <div>
                        </div>
                        <div>
                            {localeSelect}
                        </div>
                    </StyledNav>
                </Container>
            </StyledHeader>

            <Container style={{ paddingTop: "3em", paddingBottom: "2em"}}>
                    {/* <h1>{pageTitle} | {data.site.siteMetadata.title}</h1> */}
                    {children}
            </Container>
        </div>
    )
}


export default Layout;