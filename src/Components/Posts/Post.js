import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Post.css";
import { useLocalContext } from "../../Context/context";
import TakeAss from "../StudentDash/TakeAss";
import dataBase from "../../Lib/firebase";

const Post = ({ classData }) => {
  const [assigns, setAssigns] = useState([]);
  const [tests, setTests] = useState([]);
  const { userType } = useLocalContext();

  //   const post = [{
  //       "text" : "textData",
  //       "sender" : "SenDivya"
  //   }]

  useEffect(() => {
    if (classData) {
      let unsubscribe = dataBase
        .collection("Classes")
        .doc(classData.id)
        .onSnapshot((snap) => {
          console.log(snap.data());
          setAssigns([...assigns, snap.data().assignments]);
          setTests([...tests, JSON.parse(snap.data().tests)]);
        });
      return () => unsubscribe();
    }
  }, [classData]);

  console.log(assigns);

  return (
    <div>
      {assigns.map((item) => (
        <div className="amt">
          <div className="amt__Cnt">
            <div className="amt__top">
              <Avatar />
              <div>{classData.owner}</div>
            </div>
            <p className="amt__txt">{item.title}</p>
            <p className="amt__txt">{item.description}</p>
            <a href={item.url}>View Assignment</a>
            {userType == "Student" ? <TakeAss testData={item} /> : <></>}
          </div>
          {/* <div className="btn-style">
            
          </div> */}
        </div>
      ))}
      {tests.map((item) => (
        <div className="amt">
          <div className="amt__Cnt">
            <div className="amt__top">
              <Avatar />
              <div>{classData.owner}</div>
            </div>
            <p className="amt__txt">{item.title}</p>
            <p className="amt__txt">{item.description}</p>
            <a href={item.url}>View Test</a>
          </div>
          <div className="btn-style">
            {userType == "Student" ? <TakeAss testData={item} /> : <></>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Post;
