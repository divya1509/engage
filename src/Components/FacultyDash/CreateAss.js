import * as React from "react";
import "./CreateAss.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { DropzoneDialog } from "material-ui-dropzone";
import dataBase, { storage } from "../../Lib/firebase";
import { useLocalContext } from "../../Context/context";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateASS({ classData }) {
  const [open, setOpen] = React.useState(false);
  const [files, setFiles] = React.useState(null);
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [openUpload, setOpenUpload] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dataEnter = () => {
    console.log(files);
    handleClose();
    if (files == null) return;

    const temp = storage.ref(`/Assignment/${files[0].name}`).put(files[0]);
    temp.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        // var progress =
        //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log("Upload is " + progress + "% done");
        // switch (snapshot.state) {
        //   case storage.TaskState.PAUSED: // or 'paused'
        //     console.log("Upload is paused");
        //     break;
        //   case storage.TaskState.RUNNING: // or 'running'
        //     console.log("Upload is running");
        //     break;
        // }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        temp.snapshot.ref.getDownloadURL().then((downloadURL) => {
          const currAdd = {
            title: title,
            description: description,
            url: downloadURL,
            submissions: [],
          };
          dataBase
            .collection("Classes")
            .doc(classData.id)
            .update({
              assignments: [...classData.assignments, currAdd],
            })
            .then(() => {
              console.log("success firestore");
            });
        });
      }
    );
    console.log(temp);
    setFiles(null);
  };

  const handleSave = (files) => {
    setFiles(files);
    console.log(files);
    dataEnter();

    setOpenUpload(false);
  };

  const handleFileUploader = () => {
    let curr = openUpload;
    setOpenUpload(!curr);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create Assigment
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
              Assignment
            </Typography>
            <Button autoFocus color="inherit" onClick={dataEnter}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        {/* create the file uploader */}
        <div className="question_form">
          <br></br>
          <div className="section">
            <div className="question_title_section">
              <div className="question_form_top">
                <input
                  type="text"
                  className="question_form_top_name"
                  style={{ color: "black" }}
                  placeholder={"Title"}
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                ></input>
                <input
                  type="text"
                  className="question_form_top_desc"
                  placeholder="Form Description"
                  placeholder={"Description"}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></input>
                <Button
                  className="upload-btn"
                  onClick={() => {
                    handleFileUploader();
                  }}
                >
                  {" "}
                  Upload file{" "}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <DropzoneDialog
          open={openUpload}
          onSave={(acceptedFiles) => handleSave(acceptedFiles)}
          acceptedFiles={["application/pdf", "image/png", "image/bmp"]}
          showPreviews={true}
          maxFileSize={5000000}
          onClose={() => handleFileUploader()}
        />
      </Dialog>
    </div>
  );
}
