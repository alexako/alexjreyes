import React from "react"
import FadeIn from 'react-fade-in';
import { Categories } from "../../shared/categories.enum"

const Projects = ({ projects, state }) => (
  <div className="projects">
    <FadeIn delay="200">
      {projects.props
        .filter(project => {
          const tags = project.node.frontmatter.tags.split(',')
          return tags.indexOf(state.filter) > -1 || state.filter === Categories.ALL
        })
        .map(({ node }, i) => (
          <div className="project" key={i}>
            <div className="project__bg"
              style={{ backgroundImage: `url(${node.frontmatter.image.publicURL})` }}>
              <div className="project__details">
                <h1>{node.frontmatter.title}</h1>
                <span>{node.frontmatter.date}</span>
                <p>{node.excerpt}</p>
                <div className="project__links">
                  {node.frontmatter.linkProject ? <a className="project__link-btn" href={node.frontmatter.linkProject} target="_blank" rel="noreferrer">View project</a> : ''}
                  {node.frontmatter.linkCode ? <a className="project__link-btn" href={node.frontmatter.linkCode} target="_blank" rel="noreferrer">View code</a> : ''}
                </div>
              </div>
            </div>
          </div>
      ))}
    </FadeIn>
  </div>
)

export default Projects
