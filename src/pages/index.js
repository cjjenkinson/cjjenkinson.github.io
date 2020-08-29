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
         I'm a programmer and maker. I mostly work with Javascript and serverless cloud based applications.
        </p>
      </Section>
        <h2>Products</h2>
        <h2>Trackstack</h2>
        <p>Get your demo heard. Trackstack is a demo management platform for established professional DJs.</p>
        <h2>Self Sourced Man</h2>
        <h4>Trackstack</h4>
        <p>Get your demo heard. Trackstack is a demo management platform for established professional DJs.</p>
        <h4>Self Sourced Man</h4>
        <p>A community of men using tibeten, toaist and auyvedic principles to improve their wellbeing and sexual fitness.</p>
        <h2>Open Source</h2>
        <h4>Ephemeral</h4>
        <p>A set of guidelines for buildingcloud based serverless applications with AWS CDK.</p>
        <h4>Lambda oAuth2</h4>
        <p>A oAuth2 compliant library for building authentication flows on AWS Lambda.</p>
        <h4>Ruilders</h4>
        <p>A set of CRUD resolvers for Graphql APIs using Postgres or MySQL</p>
    </BioWrapper>
  </Layout>
)

export default Home;

