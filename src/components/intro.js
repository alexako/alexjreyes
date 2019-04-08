import PropTypes from "prop-types"
import React from "react"

const Intro = ({ siteTitle }) => (
  <div className="intro-container">
    <h1 className="intro-container__header-lettering">Hi, I'm
      <span className="intro-container__highlight"> Alex</span>.
      I write
      <span className="intro-container__highlight"> code </span>
      and stuff.
    </h1>
    <div className="intro-container__content">
      Ang Lorem Ipsum ay ginagamit na modelo ng industriya ng pagpriprint at 
      <span className="intro-container__content--link">
        pagtytypeset
      </span>. 
      Ang Lorem Ipsum ang naging regular na modelo simula pa noong 1500s,
      noong may isang di kilalang 
      <span className="intro-container__content--link">
        manlilimbag
      </span> 
      and kumuha ng galley ng type at ginulo ang 
      pagkaka-ayos nito upang makagawa ng libro ng mga type specimen. Nalagpasan nito hindi 
      lang limang siglo, kundi 
      <span className="intro-container__content--link">
        nalagpasan din
      </span> 
      nito ang paglaganap ng electronic typesetting 
      at nanatiling parehas. 
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
