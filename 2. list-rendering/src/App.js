import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

const dummyList = [
  {
    id:1,
    author: '이은주',
    content: '하이 1',
    emotion: 5,
    created_date: new Date().getTime()
  },
  {
    id:2,
    author: '이지은',
    content: '하이 2',
    emotion: 4,
    created_date: new Date().getTime()
  },
  {
    id:3,
    author: '이현재',
    content: '하이 3',
    emotion: 3,
    created_date: new Date().getTime()
  },
]

function App() {
  return (
    <div className="App">
      <DiaryEditor />
      <DiaryList diaryList={dummyList} />
    </div>
  );
}

export default App;
