import React from 'react';
import styled from 'styled-components';
import Header from '../components/header';
import Space from '../components/space';
import Container from '../components/container-responsive';
import Tab from '../components/tab';
import Tabs from '../components/tabs';
import CardCode from '../components/cardcode';
import Modal from '../components/modal';
import Button from '../components/button';

const tabsStyle = {
  marginTop: '5.3rem',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 99
};

const Response = styled.p`
  position: relative;
  margin: 5px 0;
  padding: 3px 15px;
  background-color: rgba(0, 0, 0, 0.2);
`;

class QuizzesPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 0,
      deleteId: false,
      languages: ['html', 'css', 'javascript', 'php', 'dart']
    };
    this.handleTabsChange = this.handleTabsChange.bind(this);
    this.handleDeleteQuiz = this.handleDeleteQuiz.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleTabsChange(event, index) {
    this.setState({ active: index });
  }

  handleDeleteQuiz(event) {
    event.preventDefault();

    // Delete the quiz

    this.setState({
      deleteId: false
    });
  }

  handleOpenModal(event) {
    event.preventDefault();
    const { id } = event.target.dataset;

    this.setState({
      deleteId: id
    });
  }

  handleCloseModal(event) {
    event.preventDefault();

    this.setState({
      deleteId: false
    });
  }

  render() {
    const { active, languages, deleteId } = this.state;

    return (
      <>
        {deleteId && (
          <Modal isOpen={true} onClose={this.handleCloseModal}>
            <div>
              <p>Vous êtes sur le point de supprimer le quiz. Êtes-vous sûre de vouloir effectuer cette action ?</p>
              <div style={{ textAlign: 'right' }}>
                <Button
                  className="button button-primary button-sm"
                  type="button"
                  style={{ marginRight: '15px' }}
                  onClick={this.handleDeleteQuiz}
                >
                  Annuler
                </Button>
                <Button className="button button-danger button-sm" type="button" onClick={this.handleDeleteQuiz}>
                  confirmer
                </Button>
              </div>
            </div>
          </Modal>
        )}
        <Header style={{ boxShadow: 'none', borderBottom: '1px solid #aaaaaa' }} />
        <Tabs defaultActive={active} onChange={this.handleTabsChange} style={tabsStyle}>
          {languages.map(lang => (
            <Tab key={lang}>{lang}</Tab>
          ))}
        </Tabs>
        <Space size={8} />
        <main style={{ paddingTop: '20px' }}>
          <Container xl={6} lg={7} md={10} xs={12}>
            <section>
              <article>
                <h3>What do this function will return ?</h3>
                <CardCode theme="primary">{'function add ($a, $b) { return $a+$b; }'}</CardCode>
                <Response>11</Response>
                <Response>10</Response>
                <Response>12</Response>
                <p>
                  <a
                    href="delete/quiz/122"
                    className="button button-danger button-sm"
                    style={{ float: 'right', marginLeft: '15px' }}
                    data-id={1250}
                    onClick={this.handleOpenModal}
                  >
                    delete
                  </a>
                  <a href="update/quiz/122" className="button button-primary button-sm" style={{ float: 'right' }}>
                    update
                  </a>
                </p>
              </article>
            </section>
          </Container>
        </main>
      </>
    );
  }
}

export default QuizzesPage;
