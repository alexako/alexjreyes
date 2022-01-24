import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'gatsby'

const BlogLink = () => (
    <Link to="https://practical-sinoussi-bc5de1.netlify.app/">
        <div className="ribbon">
            <span>Hacker Actor</span>
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
