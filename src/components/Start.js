import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import OrangeButton from './OrangeButton';
import { next } from './../store/modules/mbti';

const Header = styled.p`
  color: #1d1f1e;
  font-size: 3em;
`;

const MainImg = styled.img`
  width: inherit;
`;

const SubHeader = styled.p`
  font-size: 1.6em;
  margin-top: 3em;
  color: #777;
`;

export default function Start() {
  const dispatch = useDispatch();

  return (
    <>
      <Header>개발자 MBTI 조사</Header>
      <MainImg src="/images/codingchild.png" alt="메인 이미지" />
      <SubHeader>개발자가 흔히 접하는 상황을 골라 MBTI를 알아봅시다!</SubHeader>
      <OrangeButton text="테스트시작" clickEvent={() => dispatch(next())} />
    </>
  );
}
