import * as React from "react";
import "./TakeTest.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { DropzoneDialog } from "material-ui-dropzone";
import { useLocalContext } from "../../Context/context";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TakeAss() {
  const [openUpload, setOpenUpload] = React.useState(false);
  const { loggedInMail } = useLocalContext();

  const handleSave = (files) => {
    setOpenUpload(false);
    // if (files == null) return;

    // const temp = storage.ref(`/Submissions/${files.name}`).put(files);
    // temp.on(
    //   "state_changed",
    //   (snapshot) => {
    //     // Observe state change events such as progress, pause, and resume
    //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    //     // var progress =
    //     //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //     // console.log("Upload is " + progress + "% done");
    //     // switch (snapshot.state) {
    //     //   case storage.TaskState.PAUSED: // or 'paused'
    //     //     console.log("Upload is paused");
    //     //     break;
    //     //   case storage.TaskState.RUNNING: // or 'running'
    //     //     console.log("Upload is running");
    //     //     break;
    //     // }
    //   },
    //   (error) => {
    //     // Handle unsuccessful uploads
    //   },
    //   () => {
    //     // Handle successful uploads on complete
    //     // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    //     temp.snapshot.ref.getDownloadURL().then((downloadURL) => {
    //       const currAdd = {
    //         student: { loggedInMail },
    //         answer : {downloadURL}
    //       };
    //       dataBase
    //         .collection("Classes")
    //         .doc(classData.id)
    //         .update({
    //           assignments: [...classData.assignments, currAdd],
    //         })
    //         .then(() => {
    //           console.log("success firestore");
    //         });
    //     });
    //   }
    // );
    // console.log(temp);
  };

  const handleFileUploader = () => {
    let curr = openUpload;
    setOpenUpload(!curr);
  };

  return (
    <div>
      <Button
        className="upload-btn"
        onClick={() => {
          handleFileUploader();
        }}
      >
        {" "}
        Upload file{" "}
      </Button>
      <DropzoneDialog
        open={openUpload}
        onSave={(acceptedFiles) => handleSave(acceptedFiles)}
        acceptedFiles={["application/pdf", "image/png", "image/bmp"]}
        showPreviews={true}
        maxFileSize={5000000}
        onClose={() => handleFileUploader()}
      />
    </div>
  );
}
