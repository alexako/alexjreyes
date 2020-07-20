import React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

import Intro from '../components/intro'
import { graphql } from "gatsby"
import Portfolio from '../components/portfolio/portfolio'
import TagsList from '../components/tags'

const IndexPage = ({data}) => { 
  const projects = data.allMarkdownRemark.edges;
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
            <Portfolio props={projects}/>
            <TagsList />
        </Layout>
    )
}

export default IndexPage

export const query = graphql`
  {
    allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
      edges {
        node {
          fields {
            slug
          }
          excerpt(pruneLength: 250)
          frontmatter {
            linkProject
            linkCode
            tags
            date(formatString: "MMMM Do YYYY")
            title
            backgroundImage {
              publicURL
            }
            image {
              publicURL
            }
          }
        }
      }
    }
  }
`
