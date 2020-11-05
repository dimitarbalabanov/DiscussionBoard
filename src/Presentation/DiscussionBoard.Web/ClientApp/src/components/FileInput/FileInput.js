import React, { useState } from "react";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import VideoLibraryOutlinedIcon from "@material-ui/icons/VideoLibraryOutlined";
import FormHelperText from "@material-ui/core/FormHelperText";

const ImageInput = props => {
  const [fileName, setFileName] = useState("");

  const handleChange = e => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    if (file) {
      reader.onloadend = () => setFileName(file.name);
      reader.readAsDataURL(file);
      props.setFieldValue(props.field.name, file);
    }
  };

  return (
    <FormControl margin="normal">
      <input
        style={{ display: "none" }}
        id="video-upload"
        name={props.field.name}
        type="file"
        accept="*"
        onChange={handleChange}
      />
      <label htmlFor="video-upload">
        <Button color="primary" margin="normal" component="span">
          {props.title}
          <VideoLibraryOutlinedIcon />
        </Button>
      </label>
      {fileName ? (
        <FormHelperText id="video-upload-filename">{fileName}</FormHelperText>
      ) : null}
      {props.errorMessage ? (
        <FormHelperText id="video-upload-helper-text" error={true}>
          {props.errorMessage}
        </FormHelperText>
      ) : null}
    </FormControl>
  );
};

export default ImageInput;
