import React from "react"
import { Link } from "gatsby"
import styled from 'styled-components';

import { rhythm, scale } from "../utils/typography"

import { GlobalStyle } from '../styles/globalStyle';
import config from '../config';

const Footer = styled.footer`
  border-top: 1px solid #e7e7e7;
  padding-top: 16px;
`;

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`

    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        {config.googleSiteVerification && <meta name="google-site-verification" content={config.googleSiteVerification} />}
        <GlobalStyle />
        <main>{children}</main>
        <Footer>
          {new Date().getFullYear()} Cameron Jenkinson
          {' '} | <a href="mailto:camjenkinson@gmail.com">Email me</a>
        </Footer>
      </div>
    )
  }
}

export default Layout
