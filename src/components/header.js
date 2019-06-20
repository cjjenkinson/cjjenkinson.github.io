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
  </HeaderWrapper>
);

export default Header;
