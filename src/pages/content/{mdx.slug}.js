import * as React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import Layout from '../../components/layout'
import styled from 'styled-components'


const StyledMDWrapper = styled.div`


  p {
    margin: 0.5em 0;
  }

`

const BlogPost = ({ data }) => {

  return (
    <Layout pageTitle={data.mdx.frontmatter.title}>
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
  query($id: String) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        originalPost
        postedBy
        translatedBy
      }
      body
    }
  }
`

export default BlogPost