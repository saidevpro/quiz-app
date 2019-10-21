import React from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import Text from './text';
import Space from './space';

const Stats = Styled.div`
    display: block;
    .stat-language {
      display: flex;
      align-items: center;
    }
    li {
        margin-bottom: 20px;
    }
`;

const StatsReport = ({
  className,
  lang,
  totalQuestionCount,
  goodResponsesCount,
  numberOfCurrentQuestion
}) => (
  <Stats className={className}>
    <ul style={{ listStyle: 'none' }}>
      <li className="stat-language">
        {/* <Space size={0.5} /> */}
        <img
          src={`/assets/images/${lang}.lang.png`}
          alt={`${lang} programming language logo`}
          width="40"
        />
        &nbsp;
        <Text
          as="span"
          size="1em"
          color={lang.toLowerCase()}
          weight="700"
          className="stat-lang-name"
        >
          {lang.toUpperCase()}
        </Text>
      </li>
      <li>
        <Text size="0.95rem" color="grey" as="span">
          Good response
        </Text>
        <Space size={0.4} />
        <Text size="2.5em" color={lang} as="strong">
          {`${goodResponsesCount}/${totalQuestionCount}`}
        </Text>
      </li>
      <li>
        <Text size="0.95rem" color="grey" as="span">
          Score
        </Text>
        <Space size={0.4} />
        <Text size="2.5em" color={lang} as="strong">
          {`${goodResponsesCount * 2}/${totalQuestionCount*2}`}
        </Text>
      </li>
      <li>
        <Text size="0.95rem" color="grey" as="span">
          Question
        </Text>
        <Space size={0.4} />
        <Text size="2.5em" color={lang} as="strong">
          {`${numberOfCurrentQuestion}/${totalQuestionCount}`}
        </Text>
      </li>
    </ul>
  </Stats>
);

StatsReport.propTypes = {
  lang: PropTypes.string.isRequired,
  totalQuestionCount: PropTypes.number.isRequired,
  goodResponsesCount: PropTypes.number.isRequired,
  numberOfCurrentQuestion: PropTypes.number.isRequired
};

export default StatsReport;
