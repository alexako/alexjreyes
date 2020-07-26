const path = require("path")
const { createFilePath } = require(`gatsby-source-filesystem`)

const Tags = {
    JAVASCRIPT: { display: 'javascript', styles: { backgroundColor: '#F0DB4F' }},
    TYPESCRIPT: { display: 'typescript', styles: { backgroundColor: '#2775C4' }},
    ANGULAR: { display: 'angular', styles: { backgroundColor: '#FF3E3E' }},
    REACT: { display: 'react', styles: { backgroundColor: '#5AD9F9' }},
    REGEX: { display: 'regex', styles: { }},
    GATSBY: { display: 'gatsby', styles: { backgroundColor: '#663399' }},
    GRAPHQL: { display: 'graphql', styles: { backgroundColor: '#E34297' }},
    COMPSCI: { display: 'compsci', styles: { }},
    HEROKU: { display: 'heroku', styles: { backgroundColor: '#9E7CC1' }},
    EXPRESSJS: { display: 'expressjs', styles: { backgroundColor: '#689F62' }},
    PYTHON: { display: 'python', styles: { backgroundColor: '#417FB0' }},
    MACHINELEARNING: { display: 'machine-learning', styles: { }},
    DATAMODELING: { display: 'data-modeling', styles: { }},
    KERAS: { display: 'keras', styles: { backgroundColor: '#FF3E3E' }},
    FIREBASE: { display: 'firebase', styles: { backgroundColor: '#F9CB47' }},
    UI: { display: 'ui', styles: { }},
    SASS: { display: 'sass', styles: { backgroundColor: '#cc6599' }},
}

exports.createPages = async ({ actions, graphql }) => {
    const { createPage } = actions

    const PortfolioProjectTemplate = path.resolve(`src/templates/project-template.js`)

    const projects = await graphql(`
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

  if (projects.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  projects.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: `/projects${node.fields.slug}`,
      component: PortfolioProjectTemplate,
      context: {
        slug: node.fields.slug,
        tags: node.frontmatter.tags
      },
    })
  })

  Object.keys(Tags).forEach(tag => {
    createPage({
      path: `/projects/${Tags[tag].display}`,
      component: path.resolve('src/components/portfolio/portfolio.js'),
      context: {
        tag: Tags[tag].display,
      },
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