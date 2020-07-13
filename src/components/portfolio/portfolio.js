import React from "react"
import { Link } from "gatsby"

const Portfolio = ({ projects }) => {
  console.log('projects:', projects);
  return (
    <div className="portfolio">
      {projects.map(({ node }, i) => (
        <Link to={node.fields.slug} key={i} className="link" >
          <div className="project">
            <div className="project__bg"
              style={{ backgroundImage: `url(${node.frontmatter.image.childImageSharp.fluid.src})` }}>
              <div className="project__details">
                <h1>{node.frontmatter.title}</h1>
                <span>{node.frontmatter.date}</span>
                <p>{node.excerpt}</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default Portfolio
