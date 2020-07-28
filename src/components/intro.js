import PropTypes from 'prop-types'
import React from 'react'
import Contact from './contact'

const Intro = ({ siteTitle }) => (
    <div className="intro-container box">
        <h1 className="intro-container__header-lettering">
            Hi, I'm
            <span className="intro-container__highlight"> Alex</span>. I write
            <span className="intro-container__highlight"> code </span>
            and stuff.
        </h1>
        <div className="intro-container__content">
            A bit of a jack of all trades and a master of puns. I enjoy building
            anything from web apps with
            <span className="intro-container__content--link">Angular</span>
            to silly Cat Fact APIs in
            <span className="intro-container__content--link">ExpressJS,</span>
            to quirky robots with the
            <span className="intro-container__content--link">RPi.</span>I tinker
            around with all things tech-related and anything else that I might
            find interesting. Got any questions for me? Email
            <a
                className="intro-container__content--link"
                href="mailto:me@alexjreyes.com?subject=Hi, Alex!"
            >
                me@alexjreyes.com
            </a>
            or contact me through any of these platforms:
        </div>
    </div>
)

Intro.propTypes = {
    siteTitle: PropTypes.string,
}

Intro.defaultProps = {
    siteTitle: ``,
}

export default Intro
