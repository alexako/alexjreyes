import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import Intro from "../components/intro"
import Contact from "../components/contact"

const IndexPage = () => (
  <Layout>
    <SEO title="Home"
          keywords={[`alex reyes`,
                      `alex`,
                      `reyes`,
                      `alexako`,
                      `web developer`,
                      `web`,
                      `developer`]} />
    
    <Intro />
    <Contact />
  </Layout>
)

export default IndexPage
