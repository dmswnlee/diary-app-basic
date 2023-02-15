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

  const dataId = useRef(0)

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current // 0 
    }
    dataId.current += 1; // 추가되는 id에는 +1 해줘야함 , id는 다 달라야하니까 증가시켜줌
    setData([newItem, ...data]);

  };

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} />
    </div>
  );
}

export default App;
