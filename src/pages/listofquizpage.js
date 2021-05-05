import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Header from '../components/header/admin-header';
import Space from '../components/space';
import Container from '../components/container-responsive';
import FloatingErrorCard from '../components/floatingerrorcard';
import QuizContainer from '../containers/quizcontainer';
import Loader from '../components/loader';
import { API_URL, API_CATEGORIES_PATH, API_QUIZ_PATH } from '../constants';

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 3rem 0;
`;

const FixedTabsContainer = styled.div`
  padding: 0 10px;
  border-bottom: 1px solid #aaaaaa;
  background-color: #ffffff;
  display: block;
  margin-top: 2.6rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  .tabs-navbar-list {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    list-style: none;
    .tab {
      flex-grow: 1;
      text-align: center;
      text-decoration: none;
      cursor: pointer;
      .tab-link {
        display: block;
        padding: 0.6em 0;
        margin-bottom: -1px;
        color: #6d6d6d;
        text-decoration: none;
        text-transform: uppercase;
        &.active {
          border-bottom: 2px solid;
          color: #393dcd;
        }
      }
    }
  }
`;

const HeaderSimple = styled(Header)`
  box-shadow: none;
  border-bottom: 1px solid #e0e0e0;
`;

class QuizzesPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeCategory: '',
      categories: ['All'],
      fetching: true,
      errors: []
    };

    this.handleTabsChange = this.handleTabsChange.bind(this);
    this.handleErrorModalClose = this.handleErrorModalClose.bind(this);
  }

  componentDidMount() {
    axios
      .get(`${API_URL}/${API_CATEGORIES_PATH}`)
      .then(({ data }) =>
        this.setState(state => ({
          categories: state.categories.concat(data),
          fetching: false
        }))
      )
      .catch(error => {
        this.setState({ fetching: false, errors: ['Sorry. Request has failed !'] });
      });

    this.handleSearchChange();
  }
 
  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      this.handleSearchChange();
    }
  }

  handleSearchChange() {
    if (window) {
      const url = new URL(window.location.href);
      const c = url.searchParams.get('c');

      this.setState({ activeCategory: c ? c : 'all' });
    }
  }

  handleTabsChange(event, index) {
    this.setState({ activeIndex: index });
  }

  handleErrorModalClose(event) {
    this.setState({ errors: [] });
  }

  render() {
    const { activeCategory, categories, fetching, errors } = this.state;

    if (fetching) {
      return (
        <LoaderContainer>
          <Loader size={0.7} />
        </LoaderContainer>
      );
    }

    return (
      <>
        <HeaderSimple />
        <FloatingErrorCard isOpen={!_.isEmpty(errors)} onClose={this.handleErrorModalClose}>
          <ul style={{ listStyle: 'none' }}>
            {errors.map((error, key) => (
              <li key={key}>&#10007;&nbsp;{error}</li>
            ))}
          </ul>
        </FloatingErrorCard>
        <FixedTabsContainer>
          <ul className="tabs-navbar-list">
            {categories.map(lang => (
              <li key={lang} className="tab">
                <NavLink
                  to={`?c=${lang.toLowerCase()}`}
                  isActive={(match, { search }) =>
                    search === `?c=${lang.toLowerCase()}` ||
                    (!search && lang.toLowerCase() === 'all')
                  }
                  className="tab-link"
                  activeClassName="active"
                  key={lang}
                >
                  {lang}
                </NavLink>
              </li>
            ))}
          </ul>
        </FixedTabsContainer>
        <Space size={6} />
        <main style={{ paddingTop: '20px' }}>
          <Container xl={5} lg={7} md={10} sm={12}>
            <QuizContainer category={activeCategory !== 'all' ? activeCategory : ''} />
          </Container>
        </main>
      </>
    );
  }
}

export default QuizzesPage;
