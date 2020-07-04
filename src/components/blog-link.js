import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'gatsby'

const BlogLink = () => (
    <Link to="/blog">
        <div className="ribbon">
            <span>Blog</span>
        </div>
    </Link>
)

BlogLink.propTypes = {
    siteTitle: PropTypes.string,
}

BlogLink.defaultProps = {
    siteTitle: ``,
}

export default BlogLink
