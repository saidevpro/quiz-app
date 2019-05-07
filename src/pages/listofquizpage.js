import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Header from '../components/header';
import Space from '../components/space';
import Container from '../components/container-responsive';
import Tab from '../components/tab';
import Tabs from '../components/tabs';
import QuizContainer from '../containers/quizcontainer';
import Loader from '../components/loader';
import { API_URL, API_CATEGORIES_PATH, API_QUIZ_PATH } from '../constants';

const TabsFixed = styled(Tabs)`
  margin-top: 3.2rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const HeaderSimple = styled(Header)`
  box-shadow: none;
  border-bottom: 1px solid #aaaaaa;
`;

const fetchLanguage = () => {
  return axios.get(API_URL + '/' + API_CATEGORIES_PATH);
};

class QuizzesPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeCategory: '',
      categories: ['All'],
      fetching: true
    };

    this.handleTabsChange = this.handleTabsChange.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
  }

  componentDidMount() {
    axios
      .get(API_URL + '/' + API_CATEGORIES_PATH)
      .then(({ data }) =>
        this.setState(state => ({ categories: state.categories.concat(data), fetching: false }))
      )
      .catch(Error => {
        this.setState({ fetching: false });
      });

    if (window) {
      const url = new URL(window.location.href);
      const c = url.searchParams.get('c');

      this.setState({ activeCategory: c ? c : 'All' });
    }
  }

  handleTabsChange(event, index) {
    this.setState({ activeIndex: index });
  }

  handleLanguageChange(event) {
    const { label } = event.target.dataset;

    this.setState({ activeCategory: label });

    if (window) {
      const { pathname } = window.location;

      const params = pathname + (label ? `?c=${label}` : '');
      window.history.pushState(null, null, params);
    }
  }

  render() {
    const { activeCategory, categories, fetching } = this.state;
    let activeIndex = categories.indexOf(activeCategory);

    if (fetching) {
      return <Loader size={0.7} />;
    }

    return (
      <>
        <HeaderSimple />
        <TabsFixed
          defaultActive={activeIndex}
          onChange={this.handleTabsChange}
          onTabClick={this.handleLanguageChange}
        >
          {categories.map(lang => (
            <Tab key={lang} dataLabel={lang}>
              {lang}
            </Tab>
          ))}
        </TabsFixed>
        <Space size={6} />
        <main style={{ paddingTop: '20px' }}>
          <Container xl={6} lg={7} md={10} xs={12}>
            <QuizContainer category={activeCategory !== 'All' ? activeCategory : ''} />
          </Container>
        </main>
      </>
    );
  }
}

export default QuizzesPage;
