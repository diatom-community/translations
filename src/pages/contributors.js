import * as React from 'react'
import Layout from '../components/layout'

// todo: withLayout()
const ContributorsPage = (props) => {
  return (
    <main>
        <Layout pageTitle="Contributors" {...props}>

            <script src="https://static.airtable.com/js/embed/embed_snippet_v1.js"></script>
            <iframe 
              className="airtable-embed airtable-dynamic-height" 
              src="https://airtable.com/embed/shr98rE1fSj537F3n?backgroundColor=teal" 
              frameBorder="0" 
              onMouseWheel="" 
              width="100%" 
              height="1750" 
              style={{background: "transparent"}}
            ></iframe>
        </Layout>
    </main>
  )
}

export default ContributorsPage;