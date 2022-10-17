import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import OrangeButton from './OrangeButton';
import { next, init } from './../store/modules/mbti';
import { useState, useEffect } from 'react';

const Header = styled.p`
  color: #1d1f1e;
  font-size: 3em;
`;

const MainImg = styled.img`
  width: inherit;
`;

const SubHeader = styled.p`
  font-size: 1.6em;
  margin-top: 2em;
  color: #777;
`;

export default function Start() {
  const [counts, setCounts] = useState(0);
  const dispatch = useDispatch();

  function makeData(survey, explanation) {
    const initData = { survey: [], explanation: {} };
    if (initData.survey.length === 0) {
      for (let i = 0; i < survey.length; i = i + 2) {
        initData.survey.push({
          question: survey[i].QUESTION_TEXT,
          answer: [
            {
              text: survey[i].ANSWER_TEXT,
              result: survey[i].RESULT,
            },
            {
              text: survey[i + 1].ANSWER_TEXT,
              result: survey[i + 1].RESULT,
            },
          ],
        });
      }
    }
    for (let i = 0; i < explanation.length; i++) {
      initData.explanation[explanation[i].MBTI_TYPE] = {
        explanation: explanation[i].EXPLAINATION,
        img: explanation[i].IMG_SRC,
      };
    }

    return initData;
  }

  async function sqlfetchData() {
    // Counts값 받아오기
    const resCount = await fetch('http://localhost:3002/data/counts');
    if (resCount.status === 200) {
      const num = await resCount.json();
      if (num[0].counts !== 0) setCounts(num[0].counts);
    } else {
      throw new Error('통신 이상');
    }

    // survey 값 받아오기
    const resSurvey = await fetch('http://localhost:3002/data/survey');
    if (resSurvey.status === 200) {
      const surveyData = await resSurvey.json();
      // explanation 값 받아오기
      const resExplanation = await fetch(
        'http://localhost:3002/data/explanation'
      );
      if (resExplanation.status === 200) {
        const explanationData = await resExplanation.json();
        const madeData = makeData(surveyData, explanationData);
        dispatch(init(madeData));
      } else {
        throw new Error('통신이상');
      }
    } else {
      throw new Error('통신이상');
    }
  }

  async function mongoFetchData() {
    const resMongoCount = await fetch('http://localhost:3002/mongo/count');
    if (resMongoCount.status === 200) {
      const num = await resMongoCount.json();
      if (num[0].counts !== 0) setCounts(num[0].counts);
    } else {
      throw new Error('통신 이상');
    }
    const resMongoData = await fetch('http://localhost:3002/mongo/getdata');
    if (resMongoData.status === 200) {
      const data = await resMongoData.json();
      console.log(data);
      if (data[0].survey.length !== 0) {
        dispatch(init(data[0]));
      }
    } else {
      throw new Error('통신 이상');
    }
  }

  useEffect(() => {
    mongoFetchData();
    // sqlfetchData();
  }, []);

  // useEffect(() => {
  // async function fetchData() {
  //   // Counts값 받아오기
  //   const resCount = await fetch('http://localhost:3002/data/counts');
  //   if (resCount.status === 200) {
  //     const num = await resCount.json();
  //     if (num[0].counts !== 0) setCounts(num[0].counts);
  //   } else {
  //     throw new Error('통신 이상');
  //   }

  //   // survey 값 받아오기
  //   const resSurvey = await fetch('http://localhost:3002/data/survey');
  //   if (resSurvey.status === 200) {
  //     const surveyData = await resSurvey.json();
  //     // explanation 값 받아오기
  //     const resExplanation = await fetch(
  //       'http://localhost:3002/data/explanation'
  //     );
  //     if (resExplanation.status === 200) {
  //       const explanationData = await resExplanation.json();
  //       const madeData = makeData(surveyData, explanationData);
  //       dispatch(init(madeData));
  //     } else {
  //       throw new Error('통신이상');
  //     }
  //   } else {
  //     throw new Error('통신이상');
  //   }
  // }
  //   fetchData();
  // }, []);

  return (
    <>
      <Header>개발자 MBTI 조사</Header>
      <MainImg src="/images/codingchild.png" alt="메인 이미지" />
      <SubHeader>
        개발자가 흔히 접하는 상황에 따라서 MBTI 를 알아 봅시다! 지금까지{'\n\n'}
        {counts} 명이 참여해 주셨습니다!
      </SubHeader>
      <OrangeButton text="테스트시작" clickEvent={() => dispatch(next())} />
    </>
  );
}
