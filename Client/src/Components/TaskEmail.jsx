import React, { useState } from "react";
import firebaseApp from "../Firebase/credenciales";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firestore = getFirestore(firebaseApp);

const sendTasksEmail = async (email, subject, body) => {
  try {
    const collectionRef = collection(firestore, "mail");
    const emailContent = {
      to: email,
      message: {
        subject,
        text: body,
        html: `<p> ${body} </p>`,
      },
    };

    console.log("first");

    return await addDoc(collectionRef, emailContent);
  } catch (err) {
    console.log(err);
  }
};

function TaskEmail() {
  const [input, setInput] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e, input) => {
    e.preventDefault();

    sendTasksEmail(input.email, input.subject, input.message);

    setInput({
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e, input)}>
        <input
          type="email"
          placeholder="e-mail to"
          name="email"
          id="email"
          onChange={(e) => handleChange(e)}
          value={input.email}
        />
        <input
          type="text"
          placeholder="personalized subject"
          name="subject"
          id="subject"
          onChange={(e) => handleChange(e)}
          value={input.subject}
        />
        <input
          type="text"
          placeholder="set a short message"
          name="message"
          id="message"
          onChange={(e) => handleChange(e)}
          value={input.message}
        />
        <button type="submit">Send tasks</button>
      </form>
    </div>
  );
}

export default TaskEmail;
