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
  padding-bottom: 16px;
  margin-bottom: 32px;
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
      <h3>Things Im working on</h3>
      <Section>
        <h4>Yvonne</h4>
        <p>A conversational programming tool to build landing pages</p>
      </Section>
      <h3>Things I made</h3>
      <Section>
        <a href="https://trackstack.in" target="_blank"><h4>Trackstack</h4></a>
        <p>A&R collaboration tool for professional DJs & record labels</p>
      </Section>
    </BioWrapper>
  </Layout>
)

export default Home;

