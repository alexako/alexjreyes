import React, { useState } from 'react';
import { graphql, useStaticQuery } from "gatsby"
import { FaLaptopCode } from "react-icons/fa";
import { Categories } from "../../shared/categories.enum";
import Projects from "./projects";
import TagsList from '../tags';
import Layout from '../layout';
import SEO from '../seo';
import HomeLink from '../home-link';


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

  const initialState = {
    filter: Categories.ALL,
    tag: props.pageContext ? props.pageContext.tag : '',
  }

  const [state, setState] = useState(initialState)

  return (
    <Layout>
      <SEO
          title="Home"
          keywords={[
              `alex reyes`,
              `alex j reyes`,
              `alex`,
              `reyes`,
              `alexako`,
              `web developer`,
              `web`,
              `developer`,
              `${state.tag}`,
          ]}
      />
      { initialState.tag ? <HomeLink /> : '' }
      <div className="portfolio">
        <div className="portfolio__icon"><FaLaptopCode /></div>
        <h1>Projects</h1>
        <div className="portfolio__filters">
          {Object.keys(Categories).map((key, i) => (
            <div role="button"
                className={"portfolio__filter-btn portfolio__filter-btn" + (state.filter === Categories[key] ? '--active' : '')}
                key={i}
                tabindex={i}
                onKeyDown={(e) => setState({ ...initialState, filter: Categories[key] }, e)}
                onClick={(e) => setState({ ...initialState, filter: Categories[key] }, e)}>{Categories[key]}</div>
          ))}
        </div>

        <Projects projects={data.allMarkdownRemark.edges} state={state} />
      </div>
      <TagsList />
    </Layout>
  )
}

export default Portfolio
