import * as React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Layout from '../../components/layout'
import styled from 'styled-components'


// todo: style the MD content...
// todo: see if you can pass custom components
// todo: facelift
const StyledMDWrapper = styled.div`
  p {
    margin: 0.5em 0;
  }

`

const BlogPost = ({ data, ...rest }) => {

  if (! data.mdx) {
    return (
      <Layout pageTitle="not found" {...rest}>
        <p>Sorry the page has yet been translated.</p>
      </Layout>
    )
  }

  return (
    <Layout pageTitle={data.mdx.frontmatter.title} {...rest}>
      <p><b>date:</b>{data.mdx.frontmatter.date}</p>
      <p><b>original post:</b>{data.mdx.frontmatter.originalPost}</p>
      <p><b>original author:</b>{data.mdx.frontmatter.postedBy}</p>
      <p><b>translated by:</b>{data.mdx.frontmatter.translatedBy}</p>
      <br />

      <StyledMDWrapper>
        <MDXRenderer>
          {data.mdx.body}
        </MDXRenderer>
      </StyledMDWrapper>


    </Layout>
  )
}

export const query = graphql`
  query($locale: String!, $slug: String!) {
    mdx(
      fields: {locale: {eq: $locale}}
      frontmatter: { slug: { eq: $slug } }
    ) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        slug
        originalPost
        postedBy
        translatedBy
      }
      body
    }
  }
`


export default BlogPost