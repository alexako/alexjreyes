import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

import Intro from '../components/intro'
import Portfolio from '../components/portfolio/portfolio'
import { graphql } from "gatsby"

const IndexPage = ({data}) => { 
    console.log('data:', data)
    const projects = data.allMarkdownRemark.edges
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
            <Portfolio projects={projects}/>
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
            date(formatString: "MMMM Do YYYY")
            title
            image {
              childImageSharp {
                resize(width: 400, height: 400) {
                  src
                }
                fluid(maxHeight: 300) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
