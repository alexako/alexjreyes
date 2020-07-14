import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

import Intro from '../components/intro'
import { graphql } from "gatsby"

const IndexPage = ({data}) => { 
    return (
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
}

export default IndexPage

export const query = graphql`
  {
    allMarkdownRemark {
      edges {
        node {
          fields {
            slug
          }
          excerpt(pruneLength: 250)
          frontmatter {
            link
            tags
            date(formatString: "MMMM Do YYYY")
            title
            image {
              publicURL
            }
          }
        }
      }
    }
  }
`
