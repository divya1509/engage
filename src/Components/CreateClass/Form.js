import { Button, DialogActions, TextField } from "@material-ui/core";
import React, { useState } from "react";
import uuid from "react-uuid";
import { useLocalContext } from "../../Context/context";
import dataBase from "../../Lib/firebase";

function Form() {
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");
  const [subject, setSubject] = useState("");

  const { loggedInMail, setCreateClassDialog, classesArray, setClassesArray } =
    useLocalContext();

  const addClass = () => {
    const id = uuid();
    // console.log(id);

    dataBase
      .collection("Classes")
      .doc(id)
      .set({
        owner: loggedInMail,
        className: className,
        section: section,
        id: id,
        studentsArray: [],
        assignments: [],
        tests: [],
      })
      .then(() => {
        setCreateClassDialog(false);
        dataBase
          .collection("Classes")
          .doc(id)
          .get()
          .then((data) => {
            setClassesArray([...classesArray, data.data()]);
          });
        console.log("Created Class");
      });
  };

  return (
    <div className="form">
      <p className="class__title">Create Class</p>

      <div className="form__inputs">
        <TextField
          id="filled-basic"
          label="Class Name (required)"
          className="form__input"
          variant="filled"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />
        <TextField
          id="filled-basic"
          label="Section"
          className="form__input"
          variant="filled"
          value={section}
          onChange={(e) => setSection(e.target.value)}
        />
        <TextField
          id="filled-basic"
          label="Subject"
          className="form__input"
          variant="filled"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <DialogActions>
        <Button onClick={addClass} color="primary">
          Create
        </Button>
      </DialogActions>
    </div>
  );
}

export default Form;
