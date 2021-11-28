import React from "react";
import "./TakeTest.css";
import { Button, Typography } from "@material-ui/core";

function ScoreReleased({ data }) {
  console.log(data);

  return (
    <div>
      <div className="submit">
        <div className="user_form">
          <div className="user_form_section">
            <div className="user_title_section">
              <Typography
                style={{
                  fontSize: "26px",
                  fontFamily: "'Google Sans','Roboto','Arial','sans-serif'",
                }}
              >
                Test Results
              </Typography>
              <br></br>
              <Typography style={{ fontSize: "13px", fontWeight: "400" }}>
                Your Score has been recorded as {data}
              </Typography>
              <br></br>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScoreReleased;
