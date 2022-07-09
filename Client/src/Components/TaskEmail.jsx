import React, { useState } from "react"
import firebaseApp from "../Firebase/credenciales"
import { getFirestore, collection, addDoc } from "firebase/firestore"
import { useSelector } from "react-redux"
import InputText from "./Buttons & Inputs/InputText"
import ButtonMain from "./Buttons & Inputs/ButtonMain"

const firestore = getFirestore(firebaseApp)

const sendTasksEmail = async (email, subject, tasks) => {
  try {
    const collectionRef = collection(firestore, "mail")
    const emailContent = {
      to: email,
      message: {
        subject,
        html: `
        <div 
        style="margin: 1em 5em; 
        max-width: 1000px;
        background: linear-gradient(
          0deg,
          rgba(195, 34, 137, 1) 0%,
          rgba(253, 108, 45, 1) 100%
        ); 
        border-radius: 20px">
 
        <header style="padding: 1em 5em 0 5em">

        <h1 
        style="text-align: center; 
        color: whitesmoke"> 
        2doApp 
        </h1> 

        <p 
        style="text-align: center; 
        font-size: 1.3em;
        color: whitesmoke"> 
        Don't forget that you can also activate individual alerts to get an email 24h before the time limit!    
        </header>

        <table
        style= "color: white;
        padding: 0 2em;
        width: 100%;
        margin-bottom: 2em">

    <thead>
        <tr>
            <th colspan="5" style="font-size: 1.5em;">Tasks</th>
        </tr>
    </thead>
    <tbody style="background-color: rgba(255, 255, 255, 0.2)">
        <tr style="font-size: 1.1em;
        text-align: center">
            <td>Id</td>
            <td>Task</td>
            <td>Priority</td>
            <td>Created</td>
            <td>Details</td>
        </tr>

        ${tasks
          .map((el) => {
            return `<tr style="text-align: center">
          <td>${el.id}</td>
          <td>${el.task}</td>
          <td>${el.priority}</td>
          <td>${el.createdAt}</td>
          <td>${el.details}</td>
          </tr>`
          })
          .join("")}        

    </tbody>
</table>

    </section>
        <footer
        style="display: flex;
        align-items: center;
        justify-content: center;       
        background: rgba(255,255,255,0.448);
        width: 100%;
        height: 4em;
        border-bottom-left-radius: 250x;
        border-bottom-right-radius: 20px">

            <h3 
                style="color: whitesmoke; margin-left: 25%; min-width:50px">
                Web app developed by Jorge Castillo
            </h3>

            <div style="margin: 0.9em auto auto 2em">
                <a href="https://github.com/alfilister/">
                <img src="https://i.ibb.co/5F7ZtPd/github-logo-icon-147285.png" alt="github">
                </a><a href="https://www.linkedin.com/in/jota-castillo/" style="margin-left: 1em">
                <img src="https://i.ibb.co/0ZLX1v9/1485482199-linkedin-78667.png" alt="linkedin">
                </a>
            </div>  
        </footer>
        <div>`,
      },
    }

    return await addDoc(collectionRef, emailContent)
  } catch (err) {
    console.log(err)
  }
}

function TaskEmail() {
  const tasks = useSelector((state) => state.tasks)

  const [input, setInput] = useState({
    email: "",
    subject: "",
  })

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e, input, tasks) => {
    e.preventDefault()

    sendTasksEmail(input.email, input.subject, tasks)

    // setInput({
    //   email: "",
    //   subject: "",
    // })
  }

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e, input, tasks)}>
        <InputText
          name="email"
          value={input.email}
          placeholder="e-mail to"
          onChange={(e) => handleChange(e)}
        />

        <InputText
          name="subject"
          value={input.subject}
          placeholder="personalized subject"
          onChange={(e) => handleChange(e)}
        />

        <ButtonMain
          className="buttonGeneral"
          innerText="Send tasks"
          type="submit"
        />
      </form>
    </div>
  )
}

export default TaskEmail
