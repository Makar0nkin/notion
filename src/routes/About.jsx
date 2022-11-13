import React from 'react';
import { useUserContext } from '../components/userContext';
import {handleDate} from "../utils/handleDate";

const About = () => {
  const {user} = useUserContext()
  // const userFullDate = user.createdAt.replace("Z", "").split("T")
  // const userDate = userFullDate[0].split('-').reverse().join('.')
  // const userTime = userFullDate[1].split('.')[0]
  const [userDate, userTime] = handleDate(user.createdAt)
  return (
    <div>
      <h1>About me</h1>
      <div>Email: {user.email}</div>
      <div>Date sign up: {userDate} {userTime}</div>
    </div>
  );
};

export default About;