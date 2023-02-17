import React, { useContext, useEffect, useRef, useState } from 'react';
import { DiaryDispatchContext } from './App';

const DiaryItem = ({ id, author, content, emotion, created_date }) => {
   const { onEdit, onRemove } = useContext(DiaryDispatchContext);

   // 수정중인지 아닌지 기본은 아닌상태로
   const [isEdit, setIsEdit] = useState(false);
   const toggleIsEdit = () => setIsEdit(!isEdit);

   // 수정한 내용 상태관리
   // 수정하기 눌렀을때 기존의 데이터를 기본값으로 설정
   const [localContent, setLocalContent] = useState(content);
   const localContentInput = useRef();

   const handleRemove = () => {
      if (window.confirm(`${id}번째 일기를 삭제하시겠습니까?`)) {
         onRemove(id);
      }
   };

   // 수정한 내용을 쓰다가 마음이 바껴 수정취소를 누르고
   // 다시 수정하기를 누르면 전에 쓰던 내용이 같이 나옴
   // 그걸 보완하기 위해
   const handleQuitEdit = () => {
      setIsEdit(false);
      setLocalContent(content);
   };

   const handleEdit = () => {
      if (localContent.length < 5) {
         localContentInput.current.focus();
         return;
      }

      if (window.confirm(`${id}번 째 일기를 수정하시겠습니까?`)) {
         onEdit(id, localContent);
         toggleIsEdit();
      }
   };

   return (
      <div className="diaryItem">
         .
         <div className="info">
            <span>
               작성자 : {author} | 감정점수 : {emotion}
            </span>
            <br />
            <span className="date">{new Date(created_date).toLocaleString()}</span>
         </div>
         <div className="content">
            {isEdit ? (
               <>
                  <textarea
                     ref={localContentInput}
                     value={localContent}
                     onChange={e => setLocalContent(e.target.value)}
                  />
               </>
            ) : (
               <>{content}</>
            )}
         </div>
         {isEdit ? (
            <>
               <button onClick={handleQuitEdit}>수정 취소</button>
               <button onClick={handleEdit}>수정 완료</button>
            </>
         ) : (
            <>
               <button onClick={handleRemove}>삭제하기</button>
               <button onClick={toggleIsEdit}>수정하기</button>
            </>
         )}
      </div>
   );
};

export default React.memo(DiaryItem);
