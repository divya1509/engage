import { Avatar } from "@material-ui/core";
import React from "react";
import "./SingleClass.css";
import CreateASS from "../FacultyDash/CreateAss";
import CreateTest from "../FacultyDash/CreateTest";
import Post from "../Posts/Post";
import { useLocalContext } from "../../Context/context";

const SingleClass = ({ classData }) => {
  const { userType } = useLocalContext();
  return (
    <div className="main">
      <div className="main__wrapper">
        <div className="main__content">
          <div className="main__wrapper1">
            {/* <div className="main__bgImage">
                            <div className="main__emptyStyles" />
                        </div> */}
            <div className="main__text">
              <h1 className="main__heading main__overflow">
                {classData.className}
              </h1>
              <div className="main__section main__overflow">
                {classData.section}
              </div>
              <div className="main__wrapper2">
                <em className="main__code">Class Code :</em>
                <div className="main__id">{classData.id}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="main__announce">
          <div className="main__status">
            <p>Upcoming</p>
            <p className="main__subText">No work due</p>
          </div>
          <div className="main__announcements">
            <div className="main__announcementsWrapper">
              <div className="main__ancContent">
                <div className="main__wrapper100">
                  <Avatar />
                  {userType === "Faculty" ? (
                    <>
                      <CreateASS classData={classData} />
                      <CreateTest classData={classData} />
                    </>
                  ) : (
                    <>
                      <h1 style={{ color: "#40407a" }}>
                        Welcome to class{classData.className}
                      </h1>
                    </>
                  )}
                </div>
                )
              </div>
            </div>
            <Post classData={classData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleClass;
