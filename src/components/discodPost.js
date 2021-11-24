import * as React from 'react'
import styled from 'styled-components'
import { LocalizedLink as Link } from "gatsby-theme-i18n"

import { MDXRenderer } from 'gatsby-plugin-mdx'

const StyledAnnouncementCard = styled.article`
  border-bottom: 1px solid #ccc;
  padding: 1em 0;
  margin: 0 1em;
  cursor: pointer;
`;

const MarkdownWrapper = styled.div`
  padding: 1em;
  color: #070504;

  p {
    padding: 0.5em 0;
  }

  hr {
    margin: 1em 0;
  }

  ul {
    margin-left: 1.1em;
    margin-top: 0.5em;
    margin-bottom: 0.5em;

    li {
      padding: 0.15em 0;
    }
  }

  blockquote {
    border-left: 3px solid #15876c;
    color: #1a1a1a;
    font-family: Georgia, Times, "Times New Roman", serif;
    font-size: 1.05em;
    font-style: italic;
    line-height: 1.6em;
    margin: 1.1em -1em;
    padding: 0.5em 1em;
    position: relative;
    transition: .2s border ease-in-out;
    z-index: 0;
  }
`;

const StyledHeaderWrapper = styled.div`
    display: flex;
    align-content: center;
    line-height: 1em;

    text-transform: capitalize;


    > small {
        display: inline-block;
        white-space: nowrap;
        width: auto;

        &:first-of-type {
            width: 10em;
            margin-right: 1em;
        }


        &:last-of-type {
            margin-left: auto;
            align-self: flex-end;
            justify-self: flex-end;
        }
    }
`;

const SimpleHeader = ({frontmatter, category, timeToRead, handleClick}) => {

    return (
        <StyledHeaderWrapper onClick={handleClick}>
            <small>{frontmatter.date}</small>

            <p>
                {frontmatter.title} by&nbsp;
                <span style={{ color: "#44aa92"}}>@{frontmatter.postedBy}</span>&nbsp;

                <span>
                    (translated by: <small style={{ color: "#15876c"}}>@{frontmatter.translatedBy}</small>) 
                </span>
            </p>

            <small>
                {timeToRead} Min
            </small>
        </StyledHeaderWrapper>
    );
}

const DiscordPostCard = ({body, frontmatter, timeToRead, category}) => {
    const [collapsed, setCollapsed] = React.useState(true)
    const toggleCollapse = () => setCollapsed(!collapsed)

    return (
        <StyledAnnouncementCard onClick={toggleCollapse}>
            <SimpleHeader frontmatter={frontmatter} category={category} timeToRead={timeToRead} />

            {!collapsed && (
                <MarkdownWrapper>
                    <MDXRenderer>{body}</MDXRenderer>
                </MarkdownWrapper>
            )}

        </StyledAnnouncementCard>
    )
}

export default DiscordPostCard;