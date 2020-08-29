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
        <h2>Products</h2>
        <h4>Trackstack</h4>
        <p>Get your demo heard. Trackstack is a demo management platform for established professional DJs.</p>
        <h2>Open Source</h2>
        <h4>Ephemeral</h4>
        <p>Guidelines for building cloud based serverless applications with AWS CDK.</p>
        <h4>Lambda oAuth2</h4>
        <p>oAuth2 compliant library for building authentication flows on AWS Lambda.</p>
    </BioWrapper>
  </Layout>
)

export default Home;

