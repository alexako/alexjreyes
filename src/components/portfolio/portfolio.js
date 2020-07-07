import React from "react"
import { Link } from "gatsby"

const Portfolio = ({ projects }) => (
  <div className="portfolio">
    {projects.map(({ node }, i) => (
      <Link to={node.fields.slug} key={i} className="link" >
        <div className="portfolio__project">
          <h1>{node.frontmatter.title}</h1>
          <span>{node.frontmatter.date}</span>
          <p>{node.excerpt}</p>
        </div>
      </Link>
    ))}
  </div>
)

export default Portfolio
