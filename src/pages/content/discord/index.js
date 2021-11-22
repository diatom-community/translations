import * as React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import { LocalizedLink as Link } from "gatsby-theme-i18n"

import Layout from '../../../components/layout'
import { MDXRenderer } from 'gatsby-plugin-mdx'

// todo: facelift



const StyledAnnouncementCard = styled.article`

  border-bottom: 1px solid #ccc;
  padding-top: 2em;


`;

const MarkdownWrapper = styled.div`
  padding: 1em 4em;
  
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


  a {
    color: #008e6d;
    text-decoration: none;
  }
`;


const AnnouncementCard = ({body, frontmatter}) => {

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
          <a href={frontmatter.originalPost} target="_blank">open the original post</a>
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

// <article key={`article-${key}`}>
//   <h2>
//     <Link to={`/content/${node.childMdx.frontmatter.slug}`}>
//       {node.childMdx.frontmatter.title}
//       &nbsp;
//       <small>({node.childMdx.frontmatter.date})</small>
//     </Link> 
//   </h2>
//   <hr />
// </article>

const PostsPage = ({ data, ...rest }) => {

  const types = data.allFile.nodes.map((node) => {
    const [_, type] = node.childMdx.frontmatter.slug.split("/")
    return type
  });


  return (
    <Layout pageTitle="Translated Content" {...rest}>
      {
        data.allFile.nodes.map((node, key) => (
          <AnnouncementCard key={`announcement-${node.childMdx.frontmatter.slug}`} {...node.childMdx} />

        ))
      }
    </Layout>
  )
}

export const query = graphql`
  query($locale: String!) {
    allFile(
      filter: {
        sourceInstanceName: { eq: "discord" }
        childMdx: { fields: { locale: { eq: $locale } } }
      }
      sort:{
        fields: childMdx___frontmatter___date
        order: DESC
      }
    ) {
      nodes {
        childMdx {
          frontmatter {
            title,
            date(formatString: "MMMM D, YYYY")
            slug
            postedBy
            originalPost
            translatedBy
          }
          body
        }
      }
    }
  }
`


export default PostsPage