import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers';

const Pre = styled.pre`
  border: 1px solid #e0e0e0;
  font-family: 'Fira code';
`;

class CardCode extends React.Component {
  componentDidMount() {
    Prism.highlightAll();
  }

  componentDidUpdate(prevState) {
    Prism.highlightAll();
  }

  render() {
    const { children, language } = this.props;

    return (
      <Pre className="line-numbers">
        <code className={(Array.isArray(language) ? language : [language]).map(lang => `language-${lang} `)}>
          {children}
        </code>
      </Pre>
    );
  }
}

CardCode.propTypes = {
  language: PropTypes.any.isRequired
};

CardCode.displayName = 'CardCode';

export default CardCode;
