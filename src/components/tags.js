import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'gatsby'
import { Tags } from '../shared/tags.enum'

const TagsList = () => (
    <div className="tags-container">
        {Object.keys(Tags).map((t, i) => (
            // <Link to={"/projects/" + Tags[t].display} key={i}>
            <Link to="/projects" key={i}>
                <div className="tag" style={Tags[t].styles}>
                    <span>{Tags[t].display}</span>
                </div>
            </Link>
        ))}
    </div>
)

TagsList.propTypes = {
    siteTitle: PropTypes.string,
}

TagsList.defaultProps = {
    siteTitle: ``,
}

export default TagsList
