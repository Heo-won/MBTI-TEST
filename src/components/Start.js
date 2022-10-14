import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import OrangeButton from './OrangeButton';
import { next } from './../store/modules/mbti';
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

  useEffect(() => {
    async function fetchData() {
      const resCount = await fetch('http://localhost:3002/data/counts');
      if (resCount.status === 200) {
        const num = await resCount.json();
        if (num[0].counts !== 0) setCounts(num[0].counts);
      } else {
        throw new Error('통신 이상');
      }
    }
    fetchData();
  }, [counts]);

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
