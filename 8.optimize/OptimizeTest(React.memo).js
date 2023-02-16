import React, { useEffect, useState } from 'react';

// TextView 컴포넌트는 카운트가 변경되어도 더이상 리렌더 되지 않음
const TextView = React.memo(({ text }) => {
   useEffect(() => {
      console.log(`update :: Text : ${text}`);
   });
   return <div>{text}</div>;
});

const CountView = React.memo(({ count }) => {
   useEffect(() => {
      console.log(`update :: Count : ${count}`);
   });
   return <div>{count}</div>;
});

const OptimizeTest = () => {
   const [count, setCount] = useState(1);
   const [text, setText] = useState('');

   return (
      <div style={{ padding: 50 }}>
         <div>
            <h2>count</h2>
            <CountView count={count} />
            <button onClick={() => setCount(count + 1)}>+</button>
         </div>
         <div>
            <h2>text</h2>
            <TextView text={text} />
            <input type="text" value={text} onChange={e => setText(e.target.value)} />
         </div>
      </div>
   );
};

export default OptimizeTest;
