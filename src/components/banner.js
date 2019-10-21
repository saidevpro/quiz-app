import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import BackgroundImage from '../images/languages-bck.jpeg';

const Section = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 3rem;
  background-image: url(${BackgroundImage});
  width: 100%;
  height: 16rem;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #ad5389;
    background: -webkit-linear-gradient(to right, #ad5389, #3c1053);
    background: linear-gradient(45deg, #ad5389, #3c1053, transparent);
  }
`;

const Content = styled.div`
  max-width: 400px;
  color: #ffffff;
  z-index: 1;
`;

const Title = styled.h2`
  position: relative;
  font-size: 2rem;
  margin: 0;
  margin-bottom: 2rem;
`;

const Banner = ({ title, description }) => (
  <Section>
    <Content>
      <Title>{title}</Title>
      <p>{description}</p>
    </Content>
  </Section>
);

export default Banner;
