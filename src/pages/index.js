import React from "react"
import { Link } from "gatsby"

import styled from 'styled-components';

import Layout from "../components/layout"
import SEO from "../components/seo"

const BioWrapper = styled.div`
  margin-top: 16px;
  margin-bottom: 128px;
`;

const Section = styled.div`
  margin-bottom: 16px;
  border-bottom: 1px solid #e7e7e7;
`;

const Home = () => (
  <Layout>
    <SEO title="Cameron Jenkinson" />
    <BioWrapper>
      <Section>
        <p>
          I'm a programmer and maker. 
        </p>
      </Section>
    </BioWrapper>
  </Layout>
)

export default Home;

