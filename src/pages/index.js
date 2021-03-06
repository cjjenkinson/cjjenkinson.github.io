import React from "react"
import { Link } from "gatsby"

import styled from 'styled-components';

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const TRACKSTACK_LOGO = require("../../content/assets/trackstack.png");

const BioWrapper = styled.div`
  margin-top: 16px;
  margin-bottom: 128px;
`;

const Avatar = styled.div`
  width: 72px;
  margin-right: 16px;
`;

const Section = styled.div`
  margin-top: 24px;
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

const SocialLinks = styled.ul`
  list-style: none;
  margin-top: 32px;
  margin-left: 0px;

  & > li > a {
    box-shadow: none;
    text-decoration: none;
  }
`;

const Home = () => (
  <Layout>
    <SEO title="Cameron Jenkinson" />
    <BioWrapper>
      <Avatar>
        <Image imagePath="me.jpg" />
      </Avatar>
      <Section>
        <h3>
          Hi I’m Cameron 
        </h3> 

        <p>
          I’m a programmer and maker.
        </p>
      </Section>
      <Section>
        <h4>Find me below 👇</h4>
        <SocialLinks>
          <li>
            <a href="https://twitter.com/camjjenkinson" target="_blank">
              🐦 Follow me on Twitter
            </a>
          </li>
          <li>
            <a href="https://world.hey.com/cameronj/"  target="_blank">
              📓 Blog and newsletter
            </a>
          </li>
          <li>
            <a href="https://dev.to/cjjenkinson"  target="_blank">
              💻 Technical writing 
            </a>
          </li>
        </SocialLinks>
      </Section>
      <h3>What I am working on</h3>
      <Section>
        <a href="https://trackstack.in" target="_blank">
          <SectionHeader>
            <SectionImage src={TRACKSTACK_LOGO} />
            <h3>Trackstack</h3>
          </SectionHeader>
          <p>A&R collaboration tools for professional DJs and labels</p>
        </a>
      </Section>
    </BioWrapper>
  </Layout>
)

export default Home;

