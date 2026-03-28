import React from 'react'
import { graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const Project = ({ data }) => {
    const project = data.markdownRemark
    const { title } = project.frontmatter
    const image = getImage(project.frontmatter.image)

    return (
            <div className="project-container">
                <div>
                    <h1>{title}</h1>
                    {image && <GatsbyImage image={image} alt={title} />}
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
          gatsbyImageData(layout: FULL_WIDTH)
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
