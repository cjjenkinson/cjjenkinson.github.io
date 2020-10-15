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
    <SEO title="About Cameron" />
    <Wrapper>
      <Section>
        <p>
          Hi there I’m Cameron. I’m a software engineer based in the UK. I launched my first product in 2015 and served 1000s of professional DJs looking for a better way to discover music. After that I dived deep into technical roles at multiple startups in London including Fiit and Learnerbly.
        </p>
        
        <p>
          I like to build stuff and create things. I mostly work with Javascript and cloud based architectures.
        </p> 
      </Section>
      <Section>
        <SocialLinks>
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

