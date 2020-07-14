import React from "react"
import Projects from "./projects";
import { FaLaptopCode } from "react-icons/fa";

class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = { filter: 'all' };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(filter, e) {
    this.setState(state => ({ filter: filter }));
  }

  render() {

    return (
      <div className="portfolio">
        <div className="portfolio__icon"><FaLaptopCode /></div>
        <h1>Projects</h1>
        <div className="portfolio__filters">
          <div className={"portfolio__filter-btn portfolio__filter-btn" + (this.state.filter === 'all' ? '--active' : '')}
              role="filter"
              onKeyDown={(e) => this.handleClick('all', e)}
              onClick={(e) => this.handleClick('all', e)}>All</div>
          <div className={"portfolio__filter-btn portfolio__filter-btn" + (this.state.filter === 'frontend' ? '--active' : '')}
              role="filter"
              onKeyDown={(e) => this.handleClick('frontend', e)}
              onClick={(e) => this.handleClick('frontend', e)}>Frontend</div>
          <div className={"portfolio__filter-btn portfolio__filter-btn" + (this.state.filter === 'backend' ? '--active' : '')}
              role="filter"
              onKeyDown={(e) => this.handleClick('backend', e)}
              onClick={(e) => this.handleClick('backend', e)}>Backend</div>
          <div className={"portfolio__filter-btn portfolio__filter-btn" + (this.state.filter === 'machine learning' ? '--active' : '')}
              role="filter"
              onKeyDown={(e) => this.handleClick('machine learning', e)}
              onClick={(e) => this.handleClick('machine learning', e)}>Machine Learning</div>
        </div>

        <Projects projects={this.props} state={this.state} />
      </div>
    )
  }
}

export default Portfolio
