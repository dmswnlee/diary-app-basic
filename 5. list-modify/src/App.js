import { useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

// const dummyList = [
//   {
//     id:1,
//     author: '이은주',
//     content: '하이 1',
//     emotion: 5,
//     created_date: new Date().getTime()
//   },
//   {
//     id:2,
//     author: '이지은',
//     content: '하이 2',
//     emotion: 4,
//     created_date: new Date().getTime()
//   },
//   {
//     id:3,
//     author: '이현재',
//     content: '하이 3',
//     emotion: 3,
//     created_date: new Date().getTime()
//   },
// ]

function App() {
   const [data, setData] = useState([]);

   const dataId = useRef(0);

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
      setData(data.map((it) => (it.id === targetId ? { ...it, content: newContent } : it)));
   };

   return (
      <div className="App">
         <DiaryEditor onCreate={onCreate} />
         <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
      </div>
   );
}

export default App;
