import PropTypes from 'prop-types'
import React from 'react'
import { FaGithubAlt, FaTwitter, FaLinkedinIn, FaEnvelope } from 'react-icons/fa';

const Contact = ({ siteTitle }) => (
    <div className="contact">
        <a
            className="contact__link"
            rel="noreferrer"
            href="http://github.com/alexako/"
            target="_blank"
        >
            <FaGithubAlt />
        </a>
        <a
            className="contact__link"
            rel="noreferrer"
            href="https://twitter.com/kludgebot/"
            target="_blank"
        >
            <FaTwitter />
        </a>
        <a
            className="contact__link"
            rel="noreferrer"
            href="https://linkedin.com/in/alexjreyes"
            target="_blank"
        >
            <FaLinkedinIn />
        </a>
        <a
            className="contact__link"
            href="mailto:me@alexjreyes.com?subject=Hi, Alex!"
        >
            <FaEnvelope />
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
