import React from 'react'
import Layout from '../components/layout'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import HomeLink from '../components/home-link'
import SEO from '../components/seo'

const Project = (props) => {
    const post = props.data.markdownRemark
    const url = props.data.site.siteMetadata.siteUrl
    const { title, description } = post.frontmatter

    return (
            <div className="project-container">
                <div>
                    <h1>{title}</h1>
                    <Img fluid={post.frontmatter.image.publicURL} />
                    <div
                        className="post-body"
                        dangerouslySetInnerHTML={{ __html: post.html }}
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
       image {
         publicURL
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
