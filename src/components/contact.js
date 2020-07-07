import PropTypes from 'prop-types'
import React from 'react'

const Contact = ({ siteTitle }) => (
    <div className="contact">
        <a
            className="contact__link"
            rel="noreferrer"
            href="http://github.com/alexako/"
            target="_blank"
        >
            <i className="fab fa-github-alt fa-3x" aria-hidden="true"></i>
        </a>
        <a
            className="contact__link"
            rel="noreferrer"
            href="https://twitter.com/kludgebot/"
            target="_blank"
        >
            <i className="fab fa-twitter fa-3x" aria-hidden="true"></i>
        </a>
        <a
            className="contact__link"
            rel="noreferrer"
            href="https://linkedin.com/in/alexjreyes"
            target="_blank"
        >
            <i className="fab fa-linkedin-in fa-3x" aria-hidden="true"></i>
        </a>
        <a
            className="contact__link"
            href="mailto:me@alexjreyes.com?subject=Hi, Alex!"
        >
            <i className="far fa-envelope fa-3x" aria-hidden="true"></i>
        </a>
    </div>
)

Contact.propTypes = {
    siteTitle: PropTypes.string,
}

Contact.defaultProps = {
    siteTitle: ``,
}

export default Contact
