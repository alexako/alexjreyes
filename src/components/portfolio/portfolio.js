import React, { useState } from 'react';
import Projects from "./projects";
import { graphql, useStaticQuery } from "gatsby"
import { FaLaptopCode } from "react-icons/fa";
import { Categories } from "../../shared/categories.enum";


const Portfolio = (props) => {
  const data = useStaticQuery(graphql`
  {
    allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}) {
        edges {
          node {
            fields {
              slug
            }
            excerpt(pruneLength: 250)
            frontmatter {
              linkProject
              linkCode
              category
              tags
              date(formatString: "MMMM Do YYYY")
              title
              backgroundImage {
                publicURL
              }
              image {
                publicURL
              }
            }
          }
        }
      }
    }`
  )

  console.log('data:', data)

  const initialState = {
    filter: Categories.ALL,
    tag: props.pathContext ? props.pathContext.tag : '',
  }

  const [state, setState] = useState(initialState)

  return (
    <div className="portfolio">
      <div className="portfolio__icon"><FaLaptopCode /></div>
      <h1>Projects</h1>
      <div className="portfolio__filters">
        {Object.keys(Categories).map((key, i) => (
          <div className={"portfolio__filter-btn portfolio__filter-btn" + (state.filter === Categories[key] ? '--active' : '')}
              key={i}
              role="filter"
              onKeyDown={(e) => setState({ ...initialState, filter: Categories[key] }, e)}
              onClick={(e) => setState({ ...initialState, filter: Categories[key] }, e)}>{Categories[key]}</div>
        ))}
      </div>

      <Projects projects={data.allMarkdownRemark.edges} state={state} />
    </div>
  )
}

export default Portfolio
