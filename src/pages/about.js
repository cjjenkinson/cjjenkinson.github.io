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
          where I studied computer science. I had a guest lecture with Tim Bernes-lee in my first week and it was magic. 
          I think that’s the only reason I went there because I switched from computer science to business management 
          one year later because I thought it would make starting a successful startup easier.
        </p>

        <p>
          I spent the rest of my time at University making house music as South Royston travelling across 
          the country and Europe performing at venues. It was a lot of fun. 
        </p>

        <p>
          I got super into Hackathons back when they were the cool 48 hour build a real start-up with 
          random people like launch48 and start-up weekend. This got me really into product development and 
          engineering where I found my groove as a front-end UI engineer in the early stages of my career after I graduated.
        </p> 

        <p>
          I launched my first product in 2015 it was a music discovery app for professional DJs. Ever since then
          I’ve progressed in this field of product development working at start-ups mostly. I really enjoy working
          at start-ups and I did try the corporate world for one year at Accenture but I didn’t like it.
        </p>  

        <p>
          These days I like to keep my life relatively simple and contained. I’ve always been a creative and maker type person. 
          I never aligned with the archetype of a pure software engineer as I’m not interested in the low level details, 
          algorithms and complex math in the programming world. I like to build stuff, create things and solve problems with 
          reliable technology. That is why I describe myself as a product engineer.
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

