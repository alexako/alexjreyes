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

export default BlogLink
