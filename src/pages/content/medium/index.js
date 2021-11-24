import * as React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import { LocalizedLink as Link } from "gatsby-theme-i18n"

import Layout from '../../../components/layout'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import DiscordPostCard from '../../../components/discodPost'

// todo: facelift

const PostsPage = ({ data, ...rest }) => {

  return (
    <Layout pageTitle="Translated Content" {...rest}>
      {
        data.allFile.nodes.map((node, key) => (
          <DiscordPostCard key={`announcement-${node.childMdx.frontmatter.slug}`} {...node.childMdx} />

        ))
      }
    </Layout>
  )
}

export const query = graphql`
  query($locale: String!) {
    allFile(
      filter: {
        sourceInstanceName: { eq: "medium" }
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