import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

import Intro from '../components/intro'
import Portfolio from '../components/portfolio/portfolio'

import { banner, welcomeMessage } from '../shared/ascii'

const IndexPage = () => { 

    console.log("%c" + banner, "color: lime", welcomeMessage);

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
            <Portfolio />
        </Layout>
    )
}

export default IndexPage
