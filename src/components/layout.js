import * as React from 'react';
import "../index.css"

import { LocalizedLink as Link } from "gatsby-theme-i18n"
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components';
import Container from './container';
import HeaderImageSrc from "../images/diatom_header.jpg"
import { useLocalization, LocalesList } from "gatsby-theme-i18n"
import { Link as RawLink } from "gatsby";

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
                    <title>{pageTitle} | {data.site.siteMetadata.title}</title>
                    <StyledNav>
                        <div>
                            <StyledNavLink to="/">Home</StyledNavLink>
                            <StyledNavLink to="/about">About</StyledNavLink>
                            <StyledNavLink to="/content">Content</StyledNavLink>
                        </div>

                        <div>
                            <StyledNavLink to="/contributors">Contributors</StyledNavLink>
                        </div>
                        <div>
                            {localeSelect}
                        </div>
                    </StyledNav>
                </Container>
            </StyledHeader>

            <Container>
                    <h1>{pageTitle} | {data.site.siteMetadata.title}</h1>
                    {children}
            </Container>
        </div>
    )
}


export default Layout;