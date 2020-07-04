import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/layout'
import HomeLink from '../../components/home-link';

const IndexPage = (props) => {
  const postList = props.data.allMarkdownRemark;
  return (
    <Layout>
      <div className="blog-container">
        <HomeLink />
        <div className="post-list-container">
          {postList.edges.map(({ node }, i) => (
            <Link to={node.fields.slug} className="link" >
              <div className="post-list">
                <h1>{node.frontmatter.title}</h1>
                <span>{node.frontmatter.date}</span>
                <p>{node.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default IndexPage;

export const listQuery = graphql`
  query ListQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          fields{
            slug
          }
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "MMMM Do YYYY")
            title
          }
        }
      }
    }
  }
`