import React from 'react';
import { Link } from  'gatsby';
import styled from 'styled-components';

import Image from "./image"

const HeaderWrapper = styled.header`
  margin-bottom: 32px;
  border-bottom: 1px solid #e7e7e7;
`;

const Header = () => (
  <HeaderWrapper>
    <Link to="/">
      <div style={{ maxWidth: `124px`, marginBottom: `1rem` }}>
        <Image imagePath="me.jpg" />
      </div>
      <h2>Cameron Jenkinson</h2>
    </Link>
    <p>
      I'm a programmer and maker. Occasionally I write about technology and my experiences
      living as a nomad.
    </p>
  </HeaderWrapper>
);

export default Header;
