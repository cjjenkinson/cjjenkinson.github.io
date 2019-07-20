import React from "react"
import { Link } from "gatsby"

import styled from 'styled-components';

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const BioWrapper = styled.div`
  margin-top: 16px;
  margin-bottom: 128px;
`;

const Section = styled.div`
  margin-bottom: 16px;
  border-bottom: 1px solid #e7e7e7;
`;

const SectionFeatured = styled.div`
  padding: 16px;
  margin-bottom: 16px;
  background: #f9f9f9;
  border: 1px solid #e7e7e7;
  border-radius: 8px;
  cursor: pointer;

  & > a {
    box-shadow: none;
    text-decoration: none;
  }
`;

const SocialLinks = styled.ul`
  list-style: none;
  margin-top: 32px;
  margin-left: 0px;

  & > li > a {
    box-shadow: none;
    text-decoration: none;
  }
`;

const BlogIndex = () => (
  <Layout>
    <SEO title="Home" />
    <BioWrapper>
      <div style={{ maxWidth: `124px`, marginBottom: `1rem` }}>
        <Image />
      </div>
      <h1>Cameron Jenkinson</h1>
      <Section>
        <p>Javascript Software Engineer</p>
      </Section>
      <SectionFeatured>
        <Link to="/blog">
          📕 Blog
        </Link>
      </SectionFeatured>
      <Section>
        <SocialLinks>
          <li>
            <a href="https://github.com/cjjenkinson" target="_blank">
              💻 github/cjjenkinson
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/cameronjjenkinson/" target="_blank">
              💼 linkedin/cameronjjenkinson
            </a>
          </li>
        </SocialLinks>
      </Section>
    </BioWrapper>
  </Layout>
)

export default BlogIndex;

