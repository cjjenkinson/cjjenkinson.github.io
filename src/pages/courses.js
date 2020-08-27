import React from "react"
import { Link } from "gatsby"

import styled from 'styled-components';

import Layout from "../components/layout"
import SEO from "../components/seo"

const Wrapper = styled.div`
  margin-bottom: 128px;
`;

const Section = styled.div`
  margin-bottom: 16px;
  border-bottom: 1px solid #e7e7e7;
`;

const Courses = () => (
  <Layout>
    <SEO title="Courses" />
    <Wrapper>
      <h1>Courses</h1>
      <Section>
        <p>
          Coming soon.
        </p>
      </Section>
    </Wrapper>
  </Layout>
)

export default Courses;

