import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { useState, useEffect } from "react";

import "./TakeTest.css";
import ScoreReleased from "./Scorecard";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ testData }) {
  const [open, setOpen] = React.useState(false);
  const [showSubmit, setShowSubmit] = React.useState(false);
  const [marks, setMarks] = React.useState(0);
  // let marks = 0;

  //    const [marks, setMarks] = useState(0);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const quest = [];
  const post_answer = [];
  const [answer, setAnswer] = useState([]);
  const post_answer_data = {};

  // const questions = [{
  //     questionText: "Question",
  //     answer: false,
  //     answerKey: "Option 1",
  //     questionType: "radio",
  //     options: [{ optionText: "Option 1" }, { optionText: "Option 2" }],
  //     open: true,
  //     points: 10,
  //     required: false
  // }]

  const questions = JSON.parse(testData);

  const select = (que, option) => {
    let k = answer.findIndex((ele) => ele.question == que);

    answer[k].answer = option;
    setAnswer(answer);
  };

  useEffect(() => {
    questions.map((q) => {
      answer.push({
        question: q.questionText,
        answer: " ",
        answerKey: q.answerKey,
        points: q.points,
      });
      console.log(q);
    });
    questions.map((q, qindex) => {
      quest.push({ header: q.questionText, key: q.questionText });
    });
  }, []);

  const selectinput = (que, option) => {
    let k = answer.findIndex((ele) => ele.question == que);

    answer[k].answer = option;
    setAnswer(answer);
  };

  const selectcheck = (e, que, option) => {
    let d = [];
    let k = answer.findIndex((ele) => ele.question == que);
    if (answer[k].answer) {
      d = answer[k].answer.split(",");
    }

    if (e == true) {
      d.push(option);
    } else {
      var n = d.findIndex((el) => el.option == option);
      d.splice(n, 1);
    }

    answer[k].answer = d.join(",");

    setAnswer(answer);
  };

  const submit = () => {
    let mar = 0;
    answer.map((ele) => {
      post_answer_data[ele.question] = ele.answer;
      console.log(ele);
      if (ele.answer === ele.answerKey) {
        mar += ele.points;
      }
    });
    console.log(marks);
    setMarks(mar);
    setShowSubmit(true);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Take Test
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Test
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Submit
            </Button>
          </Toolbar>
        </AppBar>
        {showSubmit ? (
          <ScoreReleased data={marks} />
        ) : (
          <div className="submit">
            <div className="user_form">
              <div className="user_form_section">
                <div className="user_title_section">
                  <Typography style={{ fontSize: "26px" }}>
                    {"doc_name"}
                  </Typography>
                  <Typography style={{ fontSize: "15px" }}>
                    {"doc_desc"}
                  </Typography>
                </div>

                {questions.map((question, qindex) => (
                  <div className="user_form_questions">
                    <Typography
                      style={{
                        fontSize: "15px",
                        fontWeight: "400",
                        letterSpacing: ".1px",
                        lineHeight: "24px",
                        paddingBottom: "8px",
                        fontSize: "14px",
                      }}
                    >
                      {qindex + 1}. {question.questionText}
                    </Typography>
                    {question.options.map((ques, index) => (
                      <div key={index} style={{ marginBottom: "5px" }}>
                        <div style={{ display: "flex" }}>
                          <div className="form-check">
                            {question.questionType != "radio" ? (
                              question.questionType != "text" ? (
                                <label>
                                  <input
                                    type={question.questionType}
                                    name={qindex}
                                    value={ques.optionText}
                                    className="form-check-input"
                                    required={question.required}
                                    style={{
                                      margnLeft: "5px",
                                      marginRight: "5px",
                                    }}
                                    onChange={(e) => {
                                      selectcheck(
                                        e.target.checked,
                                        question.questionText,
                                        ques.optionText
                                      );
                                    }}
                                  />{" "}
                                  {ques.optionText}
                                </label>
                              ) : (
                                <label>
                                  <input
                                    type={question.questionType}
                                    name={qindex}
                                    value={ques.optionText}
                                    className="form-check-input"
                                    required={question.required}
                                    style={{
                                      margnLeft: "5px",
                                      marginRight: "5px",
                                    }}
                                    onChange={(e) => {
                                      selectinput(
                                        question.questionText,
                                        e.target.value
                                      );
                                    }}
                                  />{" "}
                                  {ques.optionText}
                                </label>
                              )
                            ) : (
                              <label>
                                <input
                                  type={question.questionType}
                                  name={qindex}
                                  value={ques.optionText}
                                  className="form-check-input"
                                  required={question.required}
                                  style={{
                                    margnLeft: "5px",
                                    marginRight: "5px",
                                  }}
                                  onChange={() => {
                                    select(
                                      question.questionText,
                                      ques.optionText
                                    );
                                  }}
                                />
                                {ques.optionText}
                              </label>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}

                <div className="user_form_submit">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={submit}
                    style={{ fontSize: "14px" }}
                  >
                    Submit
                  </Button>
                </div>

                <div className="user_footer">Google Forms</div>
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}
