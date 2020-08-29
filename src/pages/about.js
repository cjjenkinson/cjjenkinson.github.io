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
          Hi there I’m Cameron. I’m a programmer and maker based in the United Kingdom. 
          I currently work at Learnerbly where I work with a group of engineers building cloud based serverless applications.
        </p>

        <p>
          Outside of this I work on products and share things that I built along the way as open source projects.
        </p>

        <p>
          I started my journey in tech at the sweet age of 10 when I tried to put together a gaming PC so 
          I could play Command & Conquer in higher definition. Next was at the University of Southampton 
          where I studied computer science. I then spent the rest of my time at University making house 
          music as South Royston travelling across the country and Europe performing at venues, it was a lot of fun. 
        </p>

        <p>
          I got into product developmentand  my groove as a front-end UI engineer at the early stages of my career after 
          I graduated from attending Hackathons like launch48 and start-up weekend.
        </p> 
        
        <p>
          I like to build stuff, create things and solve problems with reliable technology. That is why I describe myself as a product engineer.
        </p> 
  
         <p>
          I launched my first product in 2015, a music discovery app for professional DJs. Ever since then
          I’ve progressed in product development to full-stack development working mostly at start-ups.
        </p>  

        <p>
          The writing on here contains my thoughts, experiences and my best answers to questions that developers working with 
          cloud based serverless applications struggle with. 
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

