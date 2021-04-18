import React from "react"
import { Link } from "gatsby"
import styled from 'styled-components';

import { rhythm } from "../utils/typography"

import Image from "../components/image"

import { GlobalStyle } from '../styles/globalStyle';
import config from '../config';

const Footer = styled.footer`
  text-align: center;
  margin: 16px;
  color: #989898;
`;

const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 32px;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  > h4 {
    margin: 0;
  }

  @media (max-width: 768px) {
    > span {
      display: none;
    }
  }
`;

const Avatar = styled.div`
  width: 72px;
  margin-right: 16px;
`;

const Navigation = styled.nav`

  > ul {
    list-style: none;
    display: flex;

    > li {
      font-size: 18px;
      color: #007acc;
      margin-right: 24px;

      &:hover {
        box-shadow: 0 1px 0 0 currentColor;
      }
    }
  }

  @media (max-width: 768px) {
    > ul {
      > li {
        font-size: 16px;
        margin-right: 16px;
      }
    }
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  box-shadow: none;
`;

// <Navigation>
//   <ul>
//     <li><StyledLink to="/blog">All Posts</StyledLink></li>
//     <li><StyledLink to="/about">About</StyledLink></li>
//   </ul>
// </Navigation>

const Header = () => (
  <HeaderWrapper>
    <StyledLink to="/">
      <Profile>
        <Avatar>
          <Image imagePath="me.jpg" />
        </Avatar>
      </Profile>
    </StyledLink>
  </HeaderWrapper>
)

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`

    return (
      <>
        {config.googleSiteVerification && <meta name="google-site-verification" content={config.googleSiteVerification} />}
        <GlobalStyle />
        <main>
          <div
            style={{
              marginLeft: `auto`,
              marginRight: `auto`,
              maxWidth: rhythm(24),
              padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
            }}
          >
            {children}
          </div>
        </main>
        <Footer>
          {new Date().getFullYear()} Cameron Jenkinson. 
        </Footer>
      </>
    )
  }
}

export default Layout
