import { useEffect, useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import Lifecycle from './Lifecycle';

// https://jsonplaceholder.typicode.com/comments

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

   return (
      <div className="App">
         <DiaryEditor onCreate={onCreate} />
         <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
      </div>
   );
}

export default App;
