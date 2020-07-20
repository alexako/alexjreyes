const path = require("path")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions

    const PortfolioProjectTemplate = path.resolve(`src/templates/project-template.js`)

    const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              tags
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: `/projects${node.fields.slug}`,
      component: PortfolioProjectTemplate,
      context: {
        slug: node.fields.slug,
        tags: node.frontmatter.tags
      }, // additional data can be passed via context
    })
  })
}

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions
    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({ node, getNode, basePath: `projects` })
        createNodeField({
            node,
            name: `slug`,
            value: slug,
        })

    }
}