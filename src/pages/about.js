import * as React from 'react'
import Layout from '../components/layout'

// todo: withLayout()

const AboutPage = (props) => {
  return (
    <main>
        <Layout pageTitle="About" {...props}>
            <p>TODO: give info about the project</p>
        </Layout>
    </main>
  )
}

export default AboutPage