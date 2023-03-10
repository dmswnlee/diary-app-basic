import React, { useEffect, useState } from 'react';

const CounterA = React.memo(({ count }) => {
   useEffect(() => {
      console.log(`CounterA update = count: ${count}`);
   });

   return <div>{count}</div>;
});

const CounterB = ({ obj }) => {
   useEffect(() => {
      console.log(`CounterB update = count: ${obj}`);
   });

   return <div>{obj.count}</div>;
};

const areEqual = (prevProps, nextProps) => {
//    if (prevProps.obj.count === nextProps.obj.count) {
//       return true;
//    }
//    return false;
    return prevProps.obj.count === nextProps.obj.count;
};

const MemoizationCounterB = React.memo(CounterB, areEqual);

const OptimizeTest = () => {
   const [count, setCount] = useState(1);
   const [obj, setObj] = useState({
      count: 1,
   });

   return (
      <div style={{ padding: 50 }}>
         <div>
            <h2>Counter A</h2>
            <CounterA count={count} />
            <button onClick={() => setCount(count)}>A button</button>
         </div>
         <div>
            <h2>Counter B</h2>
            <MemoizationCounterB obj={obj} />
            <button
               onClick={() =>
                  setObj({
                     count: obj.count,
                  })
               }>
               B button
            </button>
         </div>
      </div>
   );
};

export default OptimizeTest;
