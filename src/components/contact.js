import PropTypes from 'prop-types'
import React from 'react'
import { FaGithubAlt, FaLinkedinIn, FaEnvelope, FaFileDownload } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';

const Contact = ({ siteTitle }) => (
    <div className="contact">
        <a
            className="contact__link"
            rel="noreferrer"
            href="http://github.com/alexako/"
            target="_blank"
            data-tooltip-id="contact-tooltip"
            data-tooltip-content="Github"
        >
            <FaGithubAlt />
        </a>
        <a
            className="contact__link"
            rel="noreferrer"
            href="https://firebasestorage.googleapis.com/v0/b/alexjreyes-d592a.appspot.com/o/Alexander_Reyes_-_Software_Engineer-profile.pdf?alt=media&token=b88b703f-9dfe-43a4-ac89-5ac8c0b13a0a"
            target="_blank"
            data-tooltip-id="contact-tooltip"
            data-tooltip-content="Download Resume"
        >
            <FaFileDownload />
        </a>
        <a
            className="contact__link"
            rel="noreferrer"
            href="https://linkedin.com/in/alexjreyes"
            target="_blank"
            data-tooltip-id="contact-tooltip"
            data-tooltip-content="LinkedIn"
        >
            <FaLinkedinIn />
        </a>
        <a
            className="contact__link"
            href="mailto:me@alexjreyes.com?subject=Hi, Alex!"
            data-tooltip-id="contact-tooltip"
            data-tooltip-content="Email me@alexjreyes.com"
        >
            <FaEnvelope />
        </a>
        <Tooltip id="contact-tooltip" className="tooltip" place="bottom" />
    </div>
)

Contact.propTypes = {
    siteTitle: PropTypes.string,
}

Contact.defaultProps = {
    siteTitle: ``,
}

export default Contact
