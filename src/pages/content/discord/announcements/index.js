import * as React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import { LocalizedLink as Link } from "gatsby-theme-i18n"

import Layout from '../../../../components/layout'
import DiscordPostCard from '../../../../components/discodPost'

// todo: facelift

const StyledFilterWrapper = styled.div`
  display: flex;
  justify-content: end;
  border-bottom: 1px solid #44aa92;
  padding-bottom: 1em;

  a {
    text-decoration: none;
    border: 1px solid #44aa92;
    padding: 0.1em 0.3em;
    color: #44aa92;
    margin-right: 0.5em;
    border-radius: 5px;
  }
`

const TypeFilter = ({ types }) => {
  return (
    <StyledFilterWrapper>
      {types.map(type => (
        <Link  key={`post-type-${type}`} to={`/content/discord/${type}`}>
          #{type}
        </Link>
      ))}
    </StyledFilterWrapper>
  );
}

const PostsPage = ({ data, ...rest }) => {

  const posts = data.allFile.nodes.map(node => {

    const [_, category] = node.childMdx.frontmatter.slug.split("/")

    return {
      ...node,
      category,
    }
  })


  const categories = [...new Set(posts.map(post => post.category))]



  return (
    <Layout pageTitle="Translated Announcements" {...rest}>
      <TypeFilter types={categories} />
      {
        posts.map((node, key) => (
          <DiscordPostCard 
            {...node.childMdx} 
            key={`announcement-${node.childMdx.frontmatter.slug}`} 
            category={node.category} 
          />
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
        absolutePath: {regex: "/^.*\\/announcements\\/.*/"}
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
          timeToRead
        }
      }
    }
  }
`
export default PostsPage