import React from 'react';
import styled from 'styled-components';
import Header from '../components/headerquiz';
import Space from '../components/headergap';
import Container from '../components/container-responsive';
import Tab from '../components/tab';
import Tabs from '../components/tabs';
import Switcher from '../components/switcher';
import CardCode from '../components/cardcode';
import PencilIcon from '../images/edit.svg';

const tabsStyle = {
  marginTop: '5.1rem',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 99
};

const ParagraphResponse = styled.p`
  position: relative;
  margin: 5px 0;
  padding: 3px 15px;
  background-color: rgba(0, 0, 0, 0.2);
  /* padding-left: 100px; */
`;

const Response = ({ children }) => <ParagraphResponse>{children}</ParagraphResponse>;

class QuizzesPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 0
    };
    this.handleTabsChange = this.handleTabsChange.bind(this);
  }

  handleTabsChange(event, index) {
    this.setState({ active: index });
  }

  render() {
    const { active } = this.state;

    return (
      <>
        <Header style={{ boxShadow: 'none', borderBottom: '1px solid #aaaaaa' }} />
        <Tabs defaultActive={active} onChange={this.handleTabsChange} style={tabsStyle}>
          <Tab>HTML</Tab>
          <Tab>CSS</Tab>
          <Tab>JAVASCRIPT</Tab>
          <Tab>PHP</Tab>
          <Tab>DART</Tab>
        </Tabs>
        <Space size={8} />
        <main style={{ paddingTop: '20px' }}>
          <Container xl={5} lg={7} md={10} xs={12}>
            <Switcher activeItem={active}>
              <div>
                <div style={{ marginBottom: '80px' }}>
                  <h2 style={{ color: '#053344' }}>What do this function will return ?</h2>
                  <CardCode theme="primary">{'function add ($a, $b) { return $a+$b; }'}</CardCode>
                  <Response>11</Response>
                  <Response>10</Response>
                  <Response>12</Response>
                  <p>
                    <a
                      href="delete/quiz/122"
                      className="button button-danger button-sm"
                      style={{ float: 'right', marginLeft: '15px' }}
                    >
                      delete
                    </a>
                    <a href="update/quiz/122" className="button button-primary button-sm" style={{ float: 'right' }}>
                      update
                    </a>
                  </p>
                </div>
                <div style={{ marginBottom: '80px' }}>
                  <h2 style={{ color: '#053344' }}>What do this function will return ?</h2>
                  <CardCode theme="primary">{'function add ($a, $b) { return $a+$b; }'}</CardCode>
                  <Response>11</Response>
                  <Response>10</Response>
                  <Response>12</Response>
                  <p>
                    <a
                      href="delete/quiz/122"
                      className="button button-danger button-sm"
                      style={{ float: 'right', marginLeft: '15px' }}
                    >
                      delete
                    </a>
                    <a href="update/quiz/122" className="button button-primary button-sm" style={{ float: 'right' }}>
                      update
                    </a>
                  </p>
                </div>
                <div style={{ marginBottom: '80px' }}>
                  <h2 style={{ color: '#053344' }}>What do this function will return ?</h2>
                  <CardCode theme="primary">{'function add ($a, $b) { return $a+$b; }'}</CardCode>
                  <Response>11</Response>
                  <Response>10</Response>
                  <Response>12</Response>
                  <p>
                    <a
                      href="delete/quiz/122"
                      className="button button-danger button-sm"
                      style={{ float: 'right', marginLeft: '15px' }}
                    >
                      delete
                    </a>
                    <a href="update/quiz/122" className="button button-primary button-sm" style={{ float: 'right' }}>
                      update
                    </a>
                  </p>
                </div>
              </div>
              <div>Item 2</div>
              <div>Item 3</div>
              <div>Item 4</div>
              <div>Item 5</div>
            </Switcher>
          </Container>
        </main>
      </>
    );
  }
}

export default QuizzesPage;
