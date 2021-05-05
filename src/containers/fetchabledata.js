import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../components/loader';
import styled from 'styled-components';
import Error from '../components/errormodal';
import ErrorNotice from '../components/errornotice';

const LoaderComponent = styled(Loader)`
  display: block;
  margin: 2rem auto;
`;

const ErrorModal = styled(Error)`
  position: fixed;
  top: 4.5rem;
  right: 1rem;
`;

class FetchableData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      fetched: false,
      error: false,
      openModal: false
    };

    this.handleCloseErrorModal = this.handleCloseErrorModal.bind(this);
  }

  componentDidMount() {
    this.props
      .asynchFunc()
      .then(({ data }) => this.setState({ data, fetched: true }))
      .catch(error => {
        this.setState({ fetched: true, error: true, openModal: true });
      });
  }

  handleCloseErrorModal(event) {
    this.setState({ openModal: false });
  }

  render() {
    const { children } = this.props;
    const { data, error, fetched, openModal } = this.state;

    if (error) {
      return (
        <>
          <ErrorModal isOpen={openModal} onClose={this.handleCloseErrorModal}>
            <p>Data fetching has failed.</p>
            Please check that:
            <ul>
              <li>Your network is on</li>
              <li>The api server is on</li>
            </ul>
          </ErrorModal>
          <ErrorNotice>
            Sorry! Something goes wrong!. Data wasn't be fetch.
          </ErrorNotice>
        </>
      );
    }
    return fetched ? children(data) : <LoaderComponent size={0.5} />;
  }
}

FetchableData.propTypes = {
  children: PropTypes.func.isRequired,
  asynchFunc: PropTypes.func.isRequired
};

export default FetchableData;
