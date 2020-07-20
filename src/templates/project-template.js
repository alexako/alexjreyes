import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

const Project = ({ data }) => {
    const project = data.markdownRemark
    const { title } = project.frontmatter

    return (
            <div className="project-container">
                <div>
                    <h1>{title}</h1>
                    <Img fluid={project.frontmatter.image.childImageSharp.fluid} />
                    <div
                        className="post-body"
                        dangerouslySetInnerHTML={{ __html: project.html }}
                    />
                </div>
            </div>
    )
}

export default Project

export const query = graphql`
query ProjectQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
       title
       description
       date
       image {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
  site {
    siteMetadata {
      siteUrl
    }
  }
  }
`
