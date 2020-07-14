import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'gatsby'

const HomeLink = () => (
    <div className="home-link-container">
        <Link to="/">
            <h1 className="home-link">
                Hi, I'm
                <span className="home-link__highlight"> Alex</span>.
            </h1>
        </Link>
    </div>
)

HomeLink.propTypes = {
    siteTitle: PropTypes.string,
}

HomeLink.defaultProps = {
    siteTitle: ``,
}

export default HomeLink
