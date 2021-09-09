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
            href="https://firebasestorage.googleapis.com/v0/b/alexjreyes-d592a.appspot.com/o/Alexander_Joseph_Reyes_-_Web_Developer.docx?alt=media&token=https://firebasestorage.googleapis.com/v0/b/alexjreyes-d592a.appspot.com/o/Alexander_Joseph_Reyes_-_Web_Developer.docx?alt=media&token=6c1b2c56-ec6b-483a-9ce1-1d3408982f23"
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
