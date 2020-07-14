import React from "react"
import { Link } from "gatsby";

const Projects = ({ projects, state }) => {
  console.log(projects);
  const p = projects.filter(p => {
    const tags = p.node.frontmatter.tags.split(',')
    return tags.indexOf(state.filter) > -1 || state.filter === 'all'
  })
  return (
    <div className="projects box">
      {p.map(({ node }, i) => (
        <a href={node.frontmatter.link} key={i} className="link" target="_blank">
          <div className="project">
            <div className="project__bg"
              style={{ backgroundImage: `url(${node.frontmatter.image.publicURL})` }}>
              <div className="project__details">
                <h1>{node.frontmatter.title}</h1>
                <span>{node.frontmatter.date}</span>
                <p>{node.excerpt}</p>
              </div>
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}

export default Projects
