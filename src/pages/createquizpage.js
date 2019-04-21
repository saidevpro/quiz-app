import React from 'react';
import FormCreateQuiz from '../containers/formcreatequiz';
import Header from '../components/headerquiz';
import Container from '../components/container-responsive';
import HeaderGapper from '../components/headergap';

export default () => {
  return (
    <React.Fragment>
      <Header />
      <HeaderGapper />
      <main style={{ marginBottom: '30px' }}>
        <Container xl={5} lg={7} md={10} xs={12}>
          <FormCreateQuiz />
        </Container>
      </main>
    </React.Fragment>
  );
};
