import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Radio from "@material-ui/core/Radio";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

import { IconButton } from "@material-ui/core";
import { FcRightUp } from "react-icons/fc";

import { BsTrash } from "react-icons/bs";
import FilterNoneIcon from "@material-ui/icons/FilterNone";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DragIndicatorIcon from "@material-ui/icons/DragIndicator";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import "./CreateTest.css";
import dataBase from "../../Lib/firebase";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateTest({ classData }) {
  const [open, setOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [quesType, setQuesType] = useState("radio");
  const [title, setTitle] = useState("Test Title");
  const [description, setDescription] = useState("Test Description");
  const [quesReq, setQuesReq] = useState("true");

  //initial
  useEffect(() => {
    var newQuestion = {
      questionText: "Question",
      answer: false,
      answerKey: "",
      questionType: "radio",
      options: [{ optionText: "Option 1" }],
      open: true,
      required: false,
    };

    setQuestions([...questions, newQuestion]);
  }, []);

  // to change the type
  useEffect(() => {
    setQuesType(quesType);
  }, [quesType]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const saveQuestions = () => {
    setQuestions(questions);
    //db push
    const currSet = {
      title: { title },
      description: { description },
      questions: { questions },
      submissions: [],
    };
    currSet = JSON.stringify(currSet);
    dataBase
      .collection("Classes")
      .doc(classData.id)
      .update({
        tests: [...classData.tests, currSet],
      })
      .then(() => {
        console.log("success firestore");
      });
  };

  const addMoreQuestionField = () => {
    expandCloseAll();
    setQuestions((questions) => [
      ...questions,
      {
        questionText: "Question",
        questionType: "radio",
        options: [{ optionText: "Option 1" }],
        open: true,
        required: false,
      },
    ]);
  };

  const expandCloseAll = () => {
    let qs = [...questions];
    for (let j = 0; j < qs.length; j++) {
      qs[j].open = false;
    }
    setQuestions(qs);
  };

  const addQuestionType = (i, type) => {
    let qs = [...questions];
    console.log(type);
    qs[i].questionType = type;

    setQuestions(qs);
  };

  const copyQuestion = (i) => {
    expandCloseAll();
    let qs = [...questions];
    var newQuestion = qs[i];

    setQuestions([...questions, newQuestion]);

    let newquestion = { ...qs[i] };

    let qsCopy = JSON.parse(JSON.stringify(qs));
    qsCopy.push(newquestion);

    setQuestions(qsCopy);
  };

  const deleteQuestion = (i) => {
    let qs = [...questions];
    if (questions.length > 1) {
      qs.splice(i, 1);
    }
    setQuestions(qs);
  };

  function handleOptionValue(text, i, j) {
    var optionsOfQuestion = [...questions];
    optionsOfQuestion[i].options[j].optionText = text;
    //newMembersEmail[i]= email;
    setQuestions(optionsOfQuestion);
  }

  function handleQuestionValue(text, i) {
    var optionsOfQuestion = [...questions];
    optionsOfQuestion[i].questionText = text;
    setQuestions(optionsOfQuestion);
  }

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    var itemgg = [...questions];
    const itemF = reorder(
      itemgg,
      result.source.index,
      result.destination.index
    );
    setQuestions(itemF);
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const showAsQuestion = (i) => {
    let qs = [...questions];
    qs[i].open = false;
    setQuestions(qs);
  };

  const addOption = (i) => {
    var optionsOfQuestion = [...questions];
    if (optionsOfQuestion[i].options.length < 5) {
      optionsOfQuestion[i].options.push({
        optionText: "Option " + (optionsOfQuestion[i].options.length + 1),
      });
    } else {
      console.log("Max  5 options ");
    }
    //console.log(optionsOfQuestion);
    setQuestions(optionsOfQuestion);
  };

  const setOptionAnswer = (ans, qno) => {
    var Questions = [...questions];
    Questions[qno].answer = ans;
    setQuestions(Questions);
  };

  const setOptionPoints = (points, qno) => {
    var Questions = [...questions];
    Questions[qno].points = points;
    setQuestions(Questions);
  };

  const addAnswer = (i) => {
    var answerOfQuestion = [...questions];
    answerOfQuestion[i].answer = !answerOfQuestion[i].answer;
    setQuestions(answerOfQuestion);
  };

  const doneAnswer = (i) => {
    var answerOfQuestion = [...questions];
    answerOfQuestion[i].answer = !answerOfQuestion[i].answer;
    setQuestions(answerOfQuestion);
  };

  const requiredQuestion = (i) => {
    var requiredQuestion = [...questions];
    requiredQuestion[i].required = !requiredQuestion[i].required;
    console.log(requiredQuestion[i].required + " " + i);
    setQuestions(requiredQuestion);
  };

  const removeOption = (i, j) => {
    var optionsOfQuestion = [...questions];
    if (optionsOfQuestion[i].options.length > 1) {
      optionsOfQuestion[i].options.splice(j, 1);
      setQuestions(optionsOfQuestion);
    }
  };

  const handleExpand = (i) => {
    let qs = [...questions];
    for (let j = 0; j < qs.length; j++) {
      if (i === j) {
        qs[i].open = true;
      } else {
        qs[j].open = false;
      }
    }
    setQuestions(qs);
  };

  const questionsUI = () => {
    return questions.map((ques, i) => (
      <Draggable key={i} draggableId={i + "id"} index={i}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div>
              <div style={{ marginBottom: "0px" }}>
                <div style={{ width: "100%", marginBottom: "0px" }}>
                  <DragIndicatorIcon
                    style={{
                      transform: "rotate(-90deg)",
                      color: "#DAE0E2",
                      position: "relative",
                      left: "300px",
                    }}
                    fontSize="small"
                  />
                </div>

                <Accordion
                  onChange={() => {
                    handleExpand(i);
                  }}
                  expanded={questions[i].open}
                  className={questions[i].open ? "add_border" : ""}
                >
                  <AccordionSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    elevation={1}
                    style={{ width: "100%" }}
                  >
                    {!questions[i].open ? (
                      <div className="saved_questions">
                        <Typography
                          style={{
                            fontSize: "15px",
                            fontWeight: "400",
                            letterSpacing: ".1px",
                            lineHeight: "24px",
                            paddingBottom: "8px",
                          }}
                        >
                          {i + 1}. {ques.questionText}
                        </Typography>

                        {ques.options.map((op, j) => (
                          <div key={j}>
                            <div style={{ display: "flex" }}>
                              <FormControlLabel
                                style={{
                                  marginLeft: "5px",
                                  marginBottom: "5px",
                                }}
                                disabled
                                control={
                                  <input
                                    type={ques.questionType}
                                    color="primary"
                                    style={{ marginRight: "3px" }}
                                    required={ques.type}
                                  />
                                }
                                label={
                                  <Typography
                                    style={{
                                      fontFamily: " Roboto,Arial,sans-serif",
                                      fontSize: " 13px",
                                      fontWeight: "400",
                                      letterSpacing: ".2px",
                                      lineHeight: "20px",
                                      color: "#202124",
                                    }}
                                  >
                                    {ques.options[j].optionText}
                                  </Typography>
                                }
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      ""
                    )}
                  </AccordionSummary>
                  <div className="question_boxes">
                    {!ques.answer ? (
                      <AccordionDetails className="add_question">
                        <div>
                          <div className="add_question_top">
                            <input
                              type="text"
                              className="question"
                              placeholder="Question"
                              value={ques.questionText}
                              onChange={(e) => {
                                handleQuestionValue(e.target.value, i);
                              }}
                            ></input>
                            {/* <CropOriginalIcon style={{ color: "#5f6368" }} /> */}

                            <Select
                              className="select"
                              style={{ color: "#5f6368", fontSize: "13px" }}
                            >
                              <MenuItem
                                id="checkbox"
                                value="Checkbox"
                                onClick={() => {
                                  addQuestionType(i, "checkbox");
                                }}
                              >
                                <CheckBoxIcon
                                  style={{
                                    marginRight: "10px",
                                    color: "#70757a",
                                  }}
                                  checked
                                />{" "}
                                Checkboxes
                              </MenuItem>
                              <MenuItem
                                id="radio"
                                value="Radio"
                                onClick={() => {
                                  addQuestionType(i, "radio");
                                }}
                              >
                                {" "}
                                <Radio
                                  style={{
                                    marginRight: "10px",
                                    color: "#70757a",
                                  }}
                                  checked
                                />{" "}
                                Multiple Choice
                              </MenuItem>

                              {/* <MenuItem value="aate"  onClick= {(e)=>{setType(e.target.id)}}> <EventIcon style={{marginRight:"10px"}} /> Date</MenuItem>
                                <MenuItem value="date"  onClick= {(e)=>{setType(e.target.id)}}> <ScheduleIcon style={{marginRight:"10px"}} /> Time</MenuItem>
*/}
                            </Select>
                          </div>

                          {ques.options.map((op, j) => (
                            <div className="add_question_body" key={j}>
                              {/* <Checkbox  color="primary" inputProps={{ 'aria-label': 'secondary checkbox' }} disabled/> */}
                              {
                                <input
                                  type={ques.questionType}
                                  style={{ marginRight: "10px" }}
                                />
                              }
                              <div>
                                <input
                                  type="text"
                                  className="text_input"
                                  placeholder="option"
                                  value={ques.options[j].optionText}
                                  onChange={(e) => {
                                    handleOptionValue(e.target.value, i, j);
                                  }}
                                ></input>
                              </div>

                              {/* <CropOriginalIcon style={{ color: "#5f6368" }} /> */}

                              <IconButton
                                aria-label="delete"
                                onClick={() => {
                                  removeOption(i, j);
                                }}
                              >
                                <CloseIcon />
                              </IconButton>
                            </div>
                          ))}

                          {ques.options.length < 5 ? (
                            <div className="add_question_body">
                              <FormControlLabel
                                disabled
                                control={
                                  <input
                                    type={ques.questionType}
                                    color="primary"
                                    inputProps={{
                                      "aria-label": "secondary checkbox",
                                    }}
                                    style={{
                                      marginLeft: "10px",
                                      marginRight: "10px",
                                    }}
                                    disabled
                                  />
                                }
                                label={
                                  <div>
                                    <input
                                      type="text"
                                      className="text_input"
                                      style={{
                                        fontSize: "13px",
                                        width: "60px",
                                      }}
                                      placeholder="Add other"
                                    ></input>
                                    <Button
                                      size="small"
                                      onClick={() => {
                                        addOption(i);
                                      }}
                                      style={{
                                        textTransform: "none",
                                        color: "#4285f4",
                                        fontSize: "13px",
                                        fontWeight: "600",
                                      }}
                                    >
                                      Add Option
                                    </Button>
                                  </div>
                                }
                              />
                            </div>
                          ) : (
                            ""
                          )}
                          <div className="add_footer">
                            <div className="add_question_bottom_left">
                              <Button
                                size="small"
                                onClick={() => {
                                  addAnswer(i);
                                }}
                                style={{
                                  textTransform: "none",
                                  color: "#4285f4",
                                  fontSize: "13px",
                                  fontWeight: "600",
                                }}
                              >
                                {" "}
                                <FcRightUp
                                  style={{
                                    border: "2px solid #4285f4",
                                    padding: "2px",
                                    marginRight: "8px",
                                  }}
                                />{" "}
                                Answer key
                              </Button>
                            </div>

                            <div className="add_question_bottom">
                              <IconButton
                                aria-label="Copy"
                                onClick={() => {
                                  copyQuestion(i);
                                }}
                              >
                                <FilterNoneIcon />
                              </IconButton>
                              <IconButton
                                aria-label="delete"
                                onClick={() => {
                                  deleteQuestion(i);
                                }}
                              >
                                <BsTrash />
                              </IconButton>
                              <span
                                style={{ color: "#5f6368", fontSize: "13px" }}
                              >
                                Required{" "}
                              </span>{" "}
                              <Switch
                                name="checkedA"
                                color="primary"
                                checked={ques.required}
                                onClick={() => {
                                  requiredQuestion(i);
                                }}
                              />
                              <AddCircleOutlineIcon
                                onClick={addMoreQuestionField}
                                className="edit"
                              />
                            </div>
                          </div>
                        </div>
                      </AccordionDetails>
                    ) : (
                      <AccordionDetails className="add_question">
                        <div className="top_header">Choose Correct Answer</div>
                        <div>
                          <div className="add_question_top">
                            <input
                              type="text"
                              className="question "
                              placeholder="Question"
                              value={ques.questionText}
                              onChange={(e) => {
                                handleQuestionValue(e.target.value, i);
                              }}
                              disabled
                            />
                            <input
                              type="number"
                              className="points"
                              min="0"
                              step="1"
                              placeholder="0"
                              onChange={(e) => {
                                setOptionPoints(e.target.value, i);
                              }}
                            />
                          </div>

                          {ques.options.map((op, j) => (
                            <div
                              className="add_question_body"
                              key={j}
                              style={{
                                marginLeft: "8px",
                                marginBottom: "10px",
                                marginTop: "5px",
                              }}
                            >
                              <div key={j}>
                                <div style={{ display: "flex" }} className="">
                                  <div className="form-check">
                                    <label
                                      style={{ fontSize: "13px" }}
                                      onClick={() => {
                                        setOptionAnswer(
                                          ques.options[j].optionText,
                                          i
                                        );
                                      }}
                                    >
                                      {
                                        <input
                                          type={ques.questionType}
                                          name={ques.questionText}
                                          value="option3"
                                          className="form-check-input"
                                          required={ques.required}
                                          style={{
                                            marginRight: "10px",
                                            marginBottom: "10px",
                                            marginTop: "5px",
                                          }}
                                        />
                                      }

                                      {ques.options[j].optionText}
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}

                          <div className="add_question_bottom">
                            <Button
                              variant="outlined"
                              color="primary"
                              style={{
                                textTransform: "none",
                                color: "#4285f4",
                                fontSize: "12px",
                                marginTop: "12px",
                                fontWeight: "600",
                              }}
                              onClick={() => {
                                doneAnswer(i);
                              }}
                            >
                              Done
                            </Button>
                          </div>
                        </div>
                      </AccordionDetails>
                    )}
                  </div>
                </Accordion>
              </div>
            </div>
          </div>
        )}
      </Draggable>
    ));
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create Test
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
          style={{ background: "#40407a", color: "#ffdead" }}
          sx={{ position: "relative" }}
        >
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
              Create Test
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Assign
            </Button>
          </Toolbar>
        </AppBar>
        <div>
          <div className="question_form">
            <br></br>
            <div className="section">
              <div className="question_title_section">
                <div className="question_form_top">
                  <input
                    type="text"
                    className="question_form_top_name"
                    style={{ color: "black" }}
                    placeholder="Test Title"
                    value={title}
                    onChange={(e) => {
                      setTitle(title);
                    }}
                  ></input>
                  <input
                    type="text"
                    className="question_form_top_desc"
                    placeholder="Test Instructions"
                    value={description}
                    onChange={(e) => {
                      setDescription(description);
                    }}
                  ></input>
                </div>
              </div>

              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {questionsUI()}

                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>

              <div className="save_form">
                <Button
                  variant="contained"
                  color="primary"
                  style={{ fontSize: "14px" }}
                  onClick={saveQuestions}
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
