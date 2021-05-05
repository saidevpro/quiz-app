import React from 'react';
import { css } from 'emotion';
import styled from 'styled-components';
import { NavLink as Link } from 'react-router-dom';
import Header from '../components/header/front-header';
import Banner from '../components/banner';
import Container from '../components/container-responsive';
import Fetcher from '../containers/fetchabledata';
import axios from 'axios';
import Space from '../components/space';
import Row from '../components/row';
import Column from '../components/column';
import { API_URL } from '../constants';

const LanguageCard = styled.div`
  position: relative;
  padding: 1rem;
  flex: 0 0 50%;

  @media (min-width: 576px) {
    flex: 0 0 33.33%;
  }
  @media (min-width: 768px) {
    flex: 0 0 25%;
  }
  @media (min-width: 1200px) {
    flex: 0 0 20%;
  }
`;

const Card = ({ label, link, className }) => (
  <Column flex={6} lg={2} md={3} sm={4} className={className}>
    <Link
      to={link}
      className={css`
        display: block;
        height: 200px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        padding: 1.2rem;
        border-radius: 3px;
        text-decoration: none;
        color: inherit;
        text-align: center;
        transition: all 0.3s;
        &:hover {
          background-color: #03a9f40a;
          transform: scale(1.2);
        }
      `}
    >
      <img
        src={`/assets/images/${label}.lang.png`}
        alt={`${label} programming language image`}
        width="100"
        height="100"
      />
      <p
        className={css`
          margin: 10px 0 0;
        `}
      >
        <b>{label.toUpperCase()}</b>
      </p>
    </Link>
  </Column>
);

const HomePage = props => (
  <>
    <Header />
    <Space size={1.2} />
    <Banner
      title="Welcome to the programming quiz"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis efficitur eget ex vel ultrices."
    />
    <Space size={3} />
    <Container xl={10} lg={11} md={12} sm={12}>
        <Row>
          <Column flex={12} as="section">
            <h3 style={{ fontSize: '1.5rem' }}>Please, choose a programming language</h3>
            <Row>
              <Fetcher asynchFunc={_ => axios.get(`${API_URL}/categories`)}>
                {languages =>
                  languages.map(lang => (
                    <Card
                      key={lang}
                      label={lang.toLowerCase()}
                      link={`/game/${lang.toLowerCase()}`}
                      className={css`
                        padding-top: 0.7rem;
                        padding-bottom: 0.7rem;
                      `}
                    />
                  ))
                }
              </Fetcher>
            </Row>
          </Column>
        </Row>
    </Container>
  </>
);

export default HomePage;
