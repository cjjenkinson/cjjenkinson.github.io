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
      Hi, I’m Cameron. I’m software engineer focused on serverless applications.
      I share insights into building production ready services at {' '}
      <a href="https://learnerbly.com" target="_blank">Learnerbly</a>, {' '}
      <a href="https://trackstack.in" target="_blank">Trackstack</a>{' '}
      and beyond.
    </p>
  </HeaderWrapper>
);

export default Header;
