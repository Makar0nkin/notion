import React from 'react';

const NoteLayout = ({backBtnFunction ,handleTitle, title, handleBody, body, postBtnFunction, postBtnContent}) => {
  return (
    <div className="grid grid-cols-[1fr_3fr_1fr] py-10">
      <button className="w-min px-4 py-1 bg-gray-200" onClick={backBtnFunction}>back</button>
      <h1 className="flex flex-col justify-center text-center text-2xl font-medium">{postBtnContent} note</h1>
      <input
        className="col-start-1 col-end-4 my-2"
        placeholder="Name"
        onChange={handleTitle}
        value={title}
      />
      <textarea
        style={{"resize": "none"}}
        className="col-start-1 col-end-4 h-72 flex flex-col items-start"
        placeholder="Note text"
        onChange={handleBody}
        value={body}
      />
      <button
        className="px-4 py-1 bg-gray-200 col-start-2 my-2"
        onClick={postBtnFunction}
      >
        {postBtnContent}
      </button>
    </div>
  );
};

export default NoteLayout;