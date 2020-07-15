import React from "react"
import Projects from "./projects";
import { FaLaptopCode } from "react-icons/fa";
import { Categories } from "../../shared/categories.enum";

class Portfolio extends React.Component {
  constructor(props) {
    super(props)
    this.state = { filter: Categories.ALL }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(category, e) {
    this.setState(state => ({ filter: category }))
  }

  render() {

    return (
      <div className="portfolio">
        <div className="portfolio__icon"><FaLaptopCode /></div>
        <h1>Projects</h1>
        <div className="portfolio__filters">
          {Object.keys(Categories).map((key, i) => (
            <div className={"portfolio__filter-btn portfolio__filter-btn" + (this.state.filter === Categories[key] ? '--active' : '')}
                key={i}
                role="filter"
                onKeyDown={(e) => this.handleClick(Categories[key], e)}
                onClick={(e) => this.handleClick(Categories[key], e)}>{Categories[key]}</div>
          ))}
        </div>

        <Projects projects={this.props} state={this.state} />
      </div>
    )
  }
}

export default Portfolio
