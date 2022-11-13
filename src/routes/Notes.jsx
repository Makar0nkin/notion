import React, {Suspense} from 'react';
import {useLoaderData, Await, Link} from 'react-router-dom'
import Loader from "../components/Loader";
import {handleDate} from "../utils/handleDate";

export const loader = ({params: {email}}) => {
  return fetch(`http://localhost:4000/users?email=${email}`)
    .then(r => r.json())
    .then(r => r[0].id)
    .then(userId => fetch(`http://localhost:4000/notes?userId=${userId}`))
    .then(notes => notes.json())
}

const Notes = () => {
  const notesPromise = useLoaderData()
  const deleteNote = (noteId) => {
    fetch(`http://localhost:4000/notes/${noteId}`, {
      method: "DELETE",
    }).then(console.log)
    window.location.reload()
  }
  return (
    <Suspense fallback={<Loader/>}>
      <Await
        resolve={notesPromise}
        children={(notes) => (
          <div className='flex flex-col items-center my-10'>
            <div className="text-2xl font-medium my-3">Notes</div>
            <Link to="/notes/add" className="py-3 px-6 bg-gray-200 my-3">Add new note</Link>
            {notes.map(({title, createdAt, id}) => (
              <div className="grid grid-cols-[fit-content(100%)_1fr_fit-content(100%)_fit-content(100%)] gap-3 py-2 w-10/12 bg-gray-200 p-2 m-1">
                <div>{title}</div>
                <div className="text-gray-400">{handleDate(createdAt)[0]}</div>
                <Link to={`${id}`} className="text-blue-400">change</Link>
                <button className="text-red-400" onClick={() => deleteNote(id)}>delete</button>
              </div>
            ))}
          </div>
        )}
      />
    </Suspense>
  );
};

export default Notes;