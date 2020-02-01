import React from 'react';
import { Link } from  'gatsby';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  margin-bottom: 32px;
  border-bottom: 1px solid #e7e7e7;
`;

const Header = () => (
  <HeaderWrapper>
    <Link to="/"><h2>Cameron Jenkinson</h2></Link>
    <p>
      Hi, I’m Cameron. I am a remote maker which means I cant sit still for more than 5 minutes.
      I am currently nomading in Rotterdam, Netherlands and next up I'll be in Budapest, Hungary.
      Thanks for stopping by 👋
    </p>
  </HeaderWrapper>
);

export default Header;
