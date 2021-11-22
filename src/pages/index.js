import * as React from "react"
import Layout from "../components/layout"


// todo: withLayout()
const IndexPage = (props) => {
  return (
    <Layout pageTitle="Home" {...props}>
      <p>TODO: Details about the website</p>
    </Layout>
  )
}

export default IndexPage
