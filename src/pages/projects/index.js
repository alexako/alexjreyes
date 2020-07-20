import React from 'react'


import { graphql } from "gatsby"
import Layout from '../../components/layout';
import SEO from '../../components/seo';
import TagsList from '../../components/tags';
import Projects from '../../components/portfolio/projects';
import { Categories } from '../../shared/categories.enum';

const IndexPage = ({data}) => { 
  console.log('data:', data);
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

            <Projects projects={projects} state={{filter: Categories.ALL}} />
            <TagsList />
        </Layout>
    )
}

export default IndexPage

export const query = graphql`
  {
    sitePage {
      path
    }
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
            image {
              publicURL
            }
          }
        }
      }
    }
  }
`
