import React, {useEffect, useState} from 'react';
import {useLoaderData, useNavigate, useParams} from "react-router-dom";
import {useUserContext} from "../components/userContext";
import NoteLayout from "../components/NoteLayout";

export const loader = async ({params: {noteId}}) => {
  return  await fetch(`http://localhost:4000/notes?id=${noteId}`)
    .then(r => r.json())
    .then(json => json[0])
}

const ChangeNote = () => {
  const userContext = useUserContext()
  // const {email, noteId} = useParams()
  const navigate = useNavigate()
  const note = useLoaderData()

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleBody = (e) => {
    setBody(e.target.value)
  }

  const backToPrevRoute = () => {
    navigate(-1)
  }

  const changeNote = () => {
    const createdNote =
      fetch(`http://localhost:4000/users?email=${userContext.user.email}`)
        .then(r => r.json())
        .then(user => user[0].id)
        .then(userId =>
          fetch(`http://localhost:4000/notes/${note.id}`, {
            method: "PUT",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "id": note.id,
              "userId": userId.toString(),
              "title": title,
              "body": body,
              "createdAt": new Date().toISOString()
            }),
          })
            // .then(console.log)
        )
        .then(() => navigate(-1))
  }

  useEffect(() => {
    setTitle(note.title)
  }, [note])

  useEffect(() => {
    setBody(note.body)
  }, [note])

  return (
    <NoteLayout
      backBtnFunction={backToPrevRoute}
      title={title}
      handleTitle={handleTitle}
      body={body}
      handleBody={handleBody}
      postBtnFunction={changeNote}
      postBtnContent={"Edit"}
    />
  );
};

export default ChangeNote;