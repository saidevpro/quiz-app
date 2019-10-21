import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Prism from 'prismjs';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-python';
import 'prismjs/themes/prism-tomorrow.css';

const Pre = styled.pre`
  /* border: 1px solid #e0e0e0;
  font-family: 'Fira Code' !important; */
`;

const Code = styled.code`
  font-family: 'Menlo' !important ;
  font-size: 14px !important;
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
        <Code
          className={(Array.isArray(language) ? language : [language])
            .map(lang => `language-${lang}`)
            .join(' ')}
        >
          {children}
        </Code>
      </Pre>
    );
  }
}

CardCode.propTypes = {
  language: PropTypes.any.isRequired
};

CardCode.displayName = 'CardCode';

export default CardCode;
