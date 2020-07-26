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
        <ReactTooltip className="tooltip" effect='solid' place={'bottom'} />
        <a
            className="contact__link"
            rel="noreferrer"
            href="https://firebasestorage.googleapis.com/v0/b/alexjreyes-d592a.appspot.com/o/Alexander_Joseph_Reyes__Web_Developer.docx?alt=media&token=eaeec4d7-6b44-4da3-acb0-be5f81061c9d"
            target="_blank"
            data-tip="Download Resume"
        >
            <FaFileDownload />
        </a>
        <ReactTooltip className="tooltip" effect='solid' place={'bottom'} />
        <a
            className="contact__link"
            rel="noreferrer"
            href="https://linkedin.com/in/alexjreyes"
            target="_blank"
            data-tip="LinkedIn"
        >
            <FaLinkedinIn />
        </a>
        <ReactTooltip className="tooltip" arrowColor={'#3e3e3e'} effect='solid' place={'bottom'} />
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
