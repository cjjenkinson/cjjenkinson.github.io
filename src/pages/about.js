import React from "react"
import { Link } from "gatsby"

import styled from 'styled-components';

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const Wrapper = styled.div`
  margin-top: 16px;
  margin-bottom: 128px;
`;

const Section = styled.div`
  margin-bottom: 16px;
  border-bottom: 1px solid #e7e7e7;
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

const About = () => (
  <Layout>
    <SEO title="About Cameron Jenkinson" description="I like to create things and I am mostly working with serverless approaches these days." />
    <Wrapper>
      <Section>
        <p>
          Hi I’m Cameron, I am a programmer based in the UK.
        </p> 

        <p>
          I like to create things and I am mostly working with serverless approaches these days. I work as a serverless engineer at (Learnerbly]('http://learnerbly.com/') and build products in my spare time.
        </p> 

        <p>
          The writing on here contains my thoughts, experiences and my best answers to topics that relate to challenges in serverless and product development at startups.
        </p>
      </Section>
      <Section>
        <SocialLinks>
          <li>
            <a href="https://twitter.com/cameronjj__" target="_blank">
              🐦 Twitter
            </a>
          </li>
          <li>
            <a href="https://dev.to/cjjenkinson" target="_blank">
              💻 Dev.to
            </a>
          </li>
          <li>
            <a href="https://github.com/cjjenkinson" target="_blank">
              💼 github/cjjenkinson
            </a>
          </li>
          <li>
            <a href="mailto:cameronjjenkinson@gmail.com">
              📩 Email me
            </a>
          </li>
        </SocialLinks>
      </Section>
    </Wrapper>
  </Layout>
)

export default About;

