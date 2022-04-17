import PropTypes from 'prop-types'
import React from 'react'
import { FaGithubAlt, FaLinkedinIn, FaEnvelope, FaFileDownload } from 'react-icons/fa';
import ReactTooltip from 'react-tooltip';

const Contact = ({ siteTitle }) => (
    <div className="contact">
        <a
            className="contact__link"
            rel="noreferrer"
            href="http://github.com/alexako/"
            target="_blank"
            data-tip="Github"
        >
            <FaGithubAlt />
        </a>
        <a
            className="contact__link"
            rel="noreferrer"
            href="https://firebasestorage.googleapis.com/v0/b/alexjreyes-d592a.appspot.com/o/Alexander_Reyes_-_Software_Engineer-profile.pdf?alt=media&token=fcddf364-6cae-4d13-b0f0-b6b211fb9859"
            target="_blank"
            data-tip="Download Resume"
        >
            <FaFileDownload />
        </a>
        <a
            className="contact__link"
            rel="noreferrer"
            href="https://linkedin.com/in/alexjreyes"
            target="_blank"
            data-tip="LinkedIn"
        >
            <FaLinkedinIn />
        </a>
        <a
            className="contact__link"
            href="mailto:me@alexjreyes.com?subject=Hi, Alex!"
            data-tip="Email me@alexjreyes.com"
        >
            <FaEnvelope />
        </a>
        <ReactTooltip className="tooltip" effect='solid' place={'bottom'} />
    </div>
)

Contact.propTypes = {
    siteTitle: PropTypes.string,
}

Contact.defaultProps = {
    siteTitle: ``,
}

export default Contact
