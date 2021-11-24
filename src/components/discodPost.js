import * as React from 'react'
import styled from 'styled-components'
import { LocalizedLink as Link } from "gatsby-theme-i18n"

import { MDXRenderer } from 'gatsby-plugin-mdx'

const StyledAnnouncementCard = styled.article`
  border-bottom: 1px solid #ccc;
  padding-top: 2em;
`;

const MarkdownWrapper = styled.div`
  padding: 1em 3em;
  
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

const StyledAnnouncementCardHeaderWrapper = styled.div`

  display: flex;
  justify-content: space-between;
  padding: 0 1em;


  a {
    color: #008e6d;
    text-decoration: none;
  }
`;


const DiscordPostCard = ({body, frontmatter}) => {

  return (
    <StyledAnnouncementCard>
      <StyledAnnouncementCardHeaderWrapper>
        <div>
          <span style={{ color: "#44aa92"}}>@{frontmatter.postedBy}</span>&nbsp;
          <small>
            (transleted by: <span style={{ color: "#15876c"}}>@{frontmatter.translatedBy}</span>) 
          </small>

          <br />
          <small style={{ color: "#44aa92"}}>{frontmatter.date}</small>
        </div>

        <div>
          <small><a href={frontmatter.originalPost} target="_blank">see original in discord</a></small>
        </div>

      </StyledAnnouncementCardHeaderWrapper>

      <MarkdownWrapper>
        <MDXRenderer>
          {body}
        </MDXRenderer>
      </MarkdownWrapper>
    </StyledAnnouncementCard>
  )
}



export default DiscordPostCard;