import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

import Intro from '../components/intro'
import Portfolio from '../components/portfolio/portfolio'

const IndexPage = () => { 
    return (
        <Layout>
            <SEO
                title="Home"
                keywords={[
                    `alex reyes`,
                    `alex j reyes`,
                    `alex`,
                    `reyes`,
                    `alexako`,
                    `web developer`,
                    `web`,
                    `developer`,
                    `javascript`,
                    `angular`,
                    `react`,
                ]}
            />

            <Intro />
            <Contact />
            <Portfolio />
        </Layout>
    )
}

export default IndexPage
