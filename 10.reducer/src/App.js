import React, { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

const reducer = (state, action) => {
   switch (action.type) {
      case 'INIT': {
         return action.data;
      }
      case 'CREATE': {
         const created_date = new Date().getTime();
         const newItem = {
            ...action.data,
            created_date,
         };
         return [newItem, ...state];
      }
      case 'REMOVE': {
         return state.filter(it => it.id !== action.targetId);
      }
      case 'EDIT': {
         return state.map(it => (it.id === action.targetId ? { ...it, content: action.newContent } : it));
      }
      default:
         return state;
   }
};

export const DiaryStateContext = React.createContext();

// state 상태변화를 위한 함수들 내보내기
export const DiaryDispatchContext = React.createContext();

function App() {
   //const [data, setData] = useState([]);

   const [data, dispatch] = useReducer(reducer, []);

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

      dispatch({ type: 'INIT', data: initData });
   };

   useEffect(() => {
      getData();
   }, []);

   const onCreate = useCallback((author, content, emotion) => {
      dispatch({ type: 'CREATE', data: { author, content, emotion, id: dataId.current } });
      dataId.current += 1; // 추가되는 id에는 +1 해줘야함 , id는 다 달라야하니까 증가시켜줌
   }, []);

   // 어떤 아이디가 있는 타켓을 지우길 원하는 지
   const onRemove = useCallback(targetId => {
      dispatch({ type: 'REMOVE', targetId });
   }, []);

   // 리스트아이템에서 수정완료 버튼을 눌렀을때 이벤트를 이곳까지 오게 하기 위해서는
   // 데이터를 가지고 있는 이곳에 수정하는 기능을 하는 함수를 만들어야함
   const onEdit = useCallback((targetId, newContent) => {
      dispatch({ type: 'EDIT', targetId, newContent });
   }, []);

   // 리렌더링 되지 않게 만들기
   const memoizedDispatches = useMemo(() => {
      return { onCreate, onRemove, onEdit };
   }, []);

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
      <DiaryStateContext.Provider value={data}>
         <DiaryDispatchContext.Provider value={memoizedDispatches}>
            <div className="App">
               <DiaryEditor />
               <div>전체 일기 : {data.length}</div>
               <div>기분 좋은 일기 개수 : {goodCount}</div>
               <div>기분 나쁜 일기 개수 : {badCount}</div>
               <div>기분 좋은 일기 비율 : {goodRatio}</div>
               <DiaryList />
            </div>
         </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
   );
}

export default App;
