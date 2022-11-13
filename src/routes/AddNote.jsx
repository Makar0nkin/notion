import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useUserContext} from "../components/userContext";
import NoteLayout from "../components/NoteLayout";

const AddNote = () => {
  const navigate = useNavigate()
  const userContext = useUserContext()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleBody = (e) => {
    setBody(e.target.value)
  }

  const addNote = () => {
    const createdNote =
      fetch(`http://localhost:4000/users?email=${userContext.user.email}`)
        .then(r => r.json())
        .then(user => user[0].id)
        .then(userId =>
          fetch(`http://localhost:4000/notes`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              "userId": userId.toString(),
              "title": title,
              "body": body,
              "createdAt": new Date().toISOString()
            }),
          })
            .catch(e => alert(e))
        )
        .then(() => navigate(-1))
  }

  const backToPrevRoute = () => {
    navigate(-1)
  }

  return (
    <NoteLayout
      backBtnFunction={backToPrevRoute}
      title={title}
      handleTitle={handleTitle}
      body={body}
      handleBody={handleBody}
      postBtnFunction={addNote}
      postBtnContent={"Create"}
    />
    // <div className="grid grid-cols-[1fr_3fr_1fr] py-10">
    //   <button className="w-min px-4 py-1 bg-gray-200" onClick={() => navigate(-1)}>back</button>
    //   <h1 className="flex flex-col justify-center text-center text-2xl font-medium">Create note</h1>
    //   <input
    //     className="col-start-1 col-end-4 my-2"
    //     placeholder="Name"
    //     onChange={handleTitle}
    //     value={title}
    //   />
    //   <textarea
    //     style={{"resize": "none"}}
    //     className="col-start-1 col-end-4 h-72 flex flex-col items-start"
    //     placeholder="Note text"
    //     onChange={handleBody}
    //     value={body}
    //   />
    //   <button
    //     className="px-4 py-1 bg-gray-200 col-start-2 my-2"
    //     onClick={addNote}
    //   >
    //     Create
    //   </button>
    // </div>
  );
};

export default AddNote;