import { useEffect, useState } from 'react';

const Lifecycle = () => {
   const [count, setCount] = useState(0);
   const [text, setText] = useState('');

   // 한번만
   useEffect(() => {
      console.log('Mount!');
   }, []);

   // 모든 일을 업데이트
   useEffect(() => {
      console.log('update!');
   });

   // count만 마운트
   useEffect(() => {
      console.log(`count is update : ${count}`);
      if(count > 5){
        alert('count가 5를 넘었습니다. 따라서 1로 초기화합니다.')
        setCount(1);
      }
   }, [count]);

   // text만 마운트
   useEffect(() => {
    console.log(`text is update : ${text}`);
   },[text])

   return (
      <div style={{ padding: 20 }}>
         <div>
            {count}
            <button onClick={() => setCount(count + 1)}>+</button>
         </div>
         <div>
            <input type="text" value={text} onChange={e => setText(e.target.value)} />
         </div>
      </div>
   );
};

export default Lifecycle;
