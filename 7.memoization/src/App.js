import { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

function App() {
   const [data, setData] = useState([]);

   const dataId = useRef(0);

   // api 호출 코드
   const getData = async () => {
      // 원하는 json값 가져오기
      const res = await fetch('https://jsonplaceholder.typicode.com/comments').then(res => res.json());

      const initData = res.slice(0, 20).map(it => {
         return {
            author: it.email,
            content: it.body,
            emotion: Math.floor(Math.random() * 5) + 1, // 0 ~ 4 까지 랜덤한 수, floor로 소수점 절삭
            created_date: new Date().getTime(),
            id: dataId.current++,
         };
      });
      setData(initData);
   };

   useEffect(() => {
      getData();
   }, []);

   const onCreate = (author, content, emotion) => {
      const created_date = new Date().getTime();
      const newItem = {
         author,
         content,
         emotion,
         created_date,
         id: dataId.current, // 0
      };
      dataId.current += 1; // 추가되는 id에는 +1 해줘야함 , id는 다 달라야하니까 증가시켜줌
      setData([newItem, ...data]);
   };

   // 어떤 아이디가 있는 타켓을 지우길 원하는 지
   const onRemove = targetId => {
      const newDiaryList = data.filter(it => it.id !== targetId);
      setData(newDiaryList);
   };

   // 리스트아이템에서 수정완료 버튼을 눌렀을때 이벤트를 이곳까지 오게 하기 위해서는
   // 데이터를 가지고 있는 이곳에 수정하는 기능을 하는 함수를 만들어야함
   const onEdit = (targetId, newContent) => {
      setData(data.map(it => (it.id === targetId ? { ...it, content: newContent } : it)));
   };

   // 감정비율 함수
   // 불필요한 렌더링을 막기위한 것
   // 우리가 Memoization 할 함수를 감싸주면 됨
   const getDiaryAnalysis = useMemo(() => {
      //console.log('일기 분석 시작'); 이런식으로 그때 그때 쓴 콘솔은 지워주는게 좋음

      const goodCount = data.filter(it => it.emotion >= 3).length;
      const badCount = data.length - goodCount;
      const goodRatio = (goodCount / data.length) * 100;
      return { goodCount, badCount, goodRatio };
   }, [data.length]); // data.length가 변화할 때만 반환

   // return전에 호출
   const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

   return (
      <div className="App">
         <DiaryEditor onCreate={onCreate} />
         <div>전체 일기 : {data.length}</div>
         <div>기분 좋은 일기 개수 : {goodCount}</div>
         <div>기분 나쁜 일기 개수 : {badCount}</div>
         <div>기분 좋은 일기 비율 : {goodRatio}</div>
         <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
      </div>
   );
}

export default App;
