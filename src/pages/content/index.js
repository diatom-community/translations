import * as React from 'react'
import { graphql } from 'gatsby'
import { LocalizedLink as Link } from "gatsby-theme-i18n"

import Layout from '../../components/layout'

// todo: facelift

const BlogPage = ({ data, ...rest }) => {

  return (
    <Layout pageTitle="My Blog Posts" {...rest}>
      {
        data.allFile.nodes.map((node, key) => (
          <article key={`article-${key}`}>
            <h2>
              <Link to={`/content/${node.childMdx.frontmatter.slug}`}>
                {node.childMdx.frontmatter.title}
                &nbsp;
                <small>({node.childMdx.frontmatter.date})</small>
              </Link> 
            </h2>
            <hr />
          </article>
        ))
      }
    </Layout>
  )
}

export const query = graphql`
  query($locale: String!) {
    allFile(
      filter: {
        sourceInstanceName: { eq: "content" }
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
          }
        }
      }
    }
  }
`


export default BlogPage