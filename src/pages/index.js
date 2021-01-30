import React from "react"
import { Link } from "gatsby"

import styled from 'styled-components';

import Layout from "../components/layout"
import SEO from "../components/seo"

const TRACKSTACK_LOGO = require("../../content/assets/trackstack.png");

const BioWrapper = styled.div`
  margin-top: 16px;
  margin-bottom: 128px;
`;

const Section = styled.div`
  padding-bottom: 16px;
  margin-bottom: 32px;
  border-bottom: 1px solid #e7e7e7;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
`;

const SectionImage = styled.img`
  width: 56px;
  border-radius: 8px;
  margin-right: 8px;
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
      <h3>Things I am working on</h3>
      <Section>
        <a href="https://trackstack.in" target="_blank">
          <SectionHeader>
            <SectionImage src={TRACKSTACK_LOGO} />
            <h3>Trackstack</h3>
          </SectionHeader>
          <p>A&R collaboration tool for professional DJs & record labels</p>
        </a>
      </Section>
    </BioWrapper>
  </Layout>
)

export default Home;

