import React from 'react';
import Styled, { css } from 'styled-components';
import CardCode from './cardcode';
import Space from './space';

const Responses = Styled.ul`
    display: flex;
    flex-direction: column;
`;
const Response = Styled.li`
    position: relative;
    padding: 0.4rem 1rem;
    border: 2px solid #e0e0e0;
    border-radius: 20rem;
    margin-bottom: 12px;
    cursor: pointer;
    padding-left: 3rem;
    &::after {
        content "";
        position: absolute;
        top: 50%;
        left: 1rem;
        right: 0;
        bottom: 0;
        width: 12px;
        height: 12px;
        display: flex;
        padding: 2px;
        transform: translateY(-50%);
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        color: #379ad6;
        border: 1px solid;
    }
    &:hover::after{
        /* ${({ showResponse }) =>
          !showResponse &&
          ` */
        background-color: #379ad6;
        color: #ffffff;
        border: 1px solid;
        /*`} */
    }
    ${({ showResponse, isUserResponse }) =>
      showResponse &&
      isUserResponse &&
      `
        &::before {
        content: '';
        position: absolute;
        top: 50%;
        right: 0.7rem;
        bottom: 0;
        width: 10px;
        height: 10px;
        display: block;
        transform: translateY(-50%);
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background-color: #eddc10;
        }
      `}
    /* &.choosed::before {
      ${({ showResponse }) =>
        showResponse &&
        `
        content: '';
        position: absolute;
        top: 50%;
        right: 1rem;
        right: 0;
        bottom: 0;
        width: 5px;
        height: 5px;
        display: block;
        transform: translateY(-50%);
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background-color: #e0e0e0;
      `} */
    ${({ showResponse, isTrueResponse }) =>
      showResponse &&
      (isTrueResponse
        ? `
          cursor: not-allowed;
          background-color: #379ad6;
          color: #ffffff;
          border: 2px solid;
          &::after {
        content "${`\\2713`}";
            color: #ffffff !important;
          }
        `
        : `
          cursor: not-allowed;          
          color: #f1403d;
          border: 2px solid;
          ::after{
            content: "${`\\2715`}";
            color: #f1403d !important;
            border: none;
          }
        `)}
`;

const QuizQuestion = ({
  className,
  question,
  code,
  description,
  onChoose,
  language,
  responses,
  showResponse,
  trueResponse,
  userResponse
}) => {
  return (
    <div>
      <h3 style={{ marginTop: 0 }}>{question}</h3>
      <CardCode theme="hidden" language={language}>
        {code}
      </CardCode>
      <Space size={1.2} />
      <Responses style={{ listStyle: 'none' }}>
        {responses.map(response =>
          showResponse ? (
            <Response
              key={response}
              showResponse={true}
              isTrueResponse={response.toLowerCase() === trueResponse.toLowerCase()}
              isUserResponse={userResponse.toLowerCase() === response.toLowerCase()}
              onClick={onChoose}
            >
              {response}
            </Response>
          ) : (
            <Response key={response} onClick={onChoose}>
              {response}
            </Response>
          )
        )}
      </Responses>
    </div>
  );
};

export default QuizQuestion;
