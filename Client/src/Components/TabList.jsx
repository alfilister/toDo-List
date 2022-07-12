import React from "react"
import { useDispatch, useSelector } from "react-redux"

import firebaseApp from "../Firebase/credenciales"
import { getFirestore, doc, setDoc } from "firebase/firestore"
import { getAuth, onAuthStateChanged } from "firebase/auth"

import { deleteTask, editTask, modifyTask } from "../Redux/Actions"

import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import "sweetalert2/src/sweetalert2.scss" // Don't forget to import the styles!

const MySwal = withReactContent(Swal)

function TabList({ task, logginStatus, userRole }) {
  const uid = useSelector((state) => state.userInfo.uid)
  const tasksState = useSelector((state) => state.tasks)
  const dispatch = useDispatch()

  const firestore = getFirestore(firebaseApp)
  const auth = getAuth(firebaseApp)

  const proFeature = (logginStatus, userRole) => {
    if (logginStatus && userRole === "pro") {
      return (
        <i class="fa-solid fa-pen-to-square" onClick={(e) => handleEdit(e)}></i>
      )
    }
  }

  const handleCheck = (e) => {
    task.taskStatus === "Active"
      ? (task.taskStatus = "Done")
      : (task.taskStatus = "Active")

    dispatch(modifyTask(task.id))

    if (userRole === "pro" || userRole === "basic") {
      const docuRef = doc(firestore, `/users/${uid}`)
      setDoc(
        docuRef,
        {
          tasks: tasksState,
        },
        { merge: true }
      )
    }
  }
  const date = new Date()
  const dateRestriction = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000 - 86400
  )
    .toISOString()
    .slice(0, 10)
  // const dateRestriction = new Date().toISOString().split("T")[0]

  const handleEdit = (e) => {
    e.preventDefault()
    MySwal.fire({
      title: "Task detail",
      icon: "info",
      iconColor: "#fecf3e",

      showDenyButton: true,
      denyButtonText: "Edit",
      denyButtonColor: "#fecf3e",
      showConfirmButton: true,
      confirmButtonColor: "#3085d6",

      html:
        `<b>Task name:</b> ${task.task}` +
        `<p><b>Task priority:</b> ${task.priority} </p>` +
        `<p><b>Created at:</b> ${task.createdAt} </p>` +
        `<p><b>Time limit:</b> ${task.timeLimit} </p>` +
        `<p><b>Set alert:</b> ${task.setAlert} </p>` +
        `<p><b>Details:</b> ${task.details} </p>`,
    }).then((result) => {
      if (result.isDenied) {
        MySwal.fire({
          html: `
          <div style="display:flex; flex-direction:column; align-items:flex-start"> 
          <label style="margin: 1em auto auto 2.3em">Task Name</label>
          <input style="margin-top:0.5em" type="text"  name='taskName' id="taskName" placeholder="${task.task}" value="${task.task}" class="swal2-input">
          </div>

          <div style="display:flex; flex-direction:column; align-items:flex-start"> 
          <label style="margin: 1em auto auto 2.3em">Priority</label>
          <input style="margin-top:0.5em" type="number" max='5' min='1' name='priority' id="priority" placeholder="${task.priority}" value="${task.priority}" class="swal2-input"> 
          </div>

          <div style="display:flex; flex-direction:column; align-items:flex-start"> 
          <label style="margin: 1em auto auto 2.3em">Time limit</label>
          <input style="margin-top:0.5em" type="date" min=${dateRestriction} name='timeLimit' id="timeLimit" value=${task.timeLimit} class="swal2-input">
          </div>

          <div style="display:flex; flex-direction:column; align-items:flex-start"> 
          <label style="margin: 1em auto auto 2.3em">Set alert: ${task.setAlert}</label>
          <select value=${task.setAlert} style="margin-top:0.5em" name='setAlert' id="setAlert" class="swal2-select">
          
          <option disabled selected> change </option>
          <option value="On" > On </option>
          <option value="Off" > Off </option>
          </select>

          </div>
          <div style="display:flex; flex-direction:column; align-items:flex-start"> 
          <label style="margin: 1em auto auto 2.3em">Details</label>
          <input style="margin-top:0.5em" type="textArea" name='details' id="details" placeholder="${task.details}" value="${task.details}" class="swal2-input">
          </div>`,

          confirmButtonText: "Confirm modifications",
          focusConfirm: true,

          preConfirm: () => {
            const formTask =
              MySwal.getPopup().querySelector("#taskName").value || task.task
            const formPriority =
              MySwal.getPopup().querySelector("#priority").value ||
              task.priority
            const formTimeLimit =
              MySwal.getPopup().querySelector("#timeLimit").value ||
              task.timeLimit
            const formSetAlert =
              (MySwal.getPopup().querySelector("#setAlert").value &&
                MySwal.getPopup().querySelector("#setAlert").value !==
                  "change" &&
                MySwal.getPopup().querySelector("#setAlert").value) ||
              task.setAlert
            const formDetails =
              MySwal.getPopup().querySelector("#details").value || task.details

            dispatch(
              editTask({
                id: task.id,
                task: formTask,
                priority:
                  (formPriority > 5 && 5) ||
                  (formPriority < 1 && 1) ||
                  (formPriority > 0 && formPriority < 6 && formPriority),
                createdAt: task.createdAt,
                timeLimit: formTimeLimit,
                setAlert: formSetAlert,
                details: formDetails,
              })
            )

            if (userRole === "pro" || userRole === "basic") {
              const docuRef = doc(firestore, `/users/${uid}`)
              setDoc(
                docuRef,
                {
                  tasks: tasksState,
                },
                { merge: true }
              )
            }
          },
        })
      }
    })
  }

  const handleTrash = (e) => {
    e.preventDefault()
    dispatch(deleteTask(task.id))

    if (uid) {
      const docuRef = doc(firestore, `/users/${uid}`)
      setDoc(
        docuRef,
        {
          tasks: tasksState.filter((el) => el.id !== task.id),
        },
        { merge: true }
      )

      onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          getAditionalInfo(firebaseUser.uid).then((info) => {
            dispatch(
              setUserInfo({
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                nickname: info.nickname,
                role: info.role,
                tasks: info.tasks,
              })
            )
          })
        }
      })
    }
  }

  var counter = []

  for (let index = 0; index < Number(task.priority); index++) {
    counter.push("flag")
  }

  var idSetter = 0

  return (
    <div className={userRole === "pro" ? "tabListPro" : "tabList"}>
      <h5>{task.task}</h5>

      <div className="flags">
        {counter.map(() => (
          <i className="fa-solid fa-circle-exclamation" key={++idSetter}></i>
        ))}
      </div>

      <button onClick={(e) => handleCheck(e)}>
        {task.taskStatus === "Active" ? "Active" : "Done"}
      </button>

      {proFeature(logginStatus, userRole)}

      <i className="fa-solid fa-trash-can" onClick={(e) => handleTrash(e)}></i>
    </div>
  )
}

export default TabList
