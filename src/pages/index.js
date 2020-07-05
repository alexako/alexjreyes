import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

import Intro from '../components/intro'

const IndexPage = () => (
    <Layout>
        <SEO
            title="Home"
            keywords={[
                `alex reyes`,
                `alex`,
                `reyes`,
                `alexako`,
                `web developer`,
                `web`,
                `developer`,
                `javascript`,
                `angular`,
            ]}
        />

        <Intro />
    </Layout>
)

export default IndexPage
