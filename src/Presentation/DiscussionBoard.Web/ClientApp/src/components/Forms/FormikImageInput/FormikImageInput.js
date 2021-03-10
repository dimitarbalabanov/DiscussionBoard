import React, { useState } from 'react';
import { useField, useFormikContext } from "formik";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import ImageIcon from "@material-ui/icons/Image";
import FormHelperText from "@material-ui/core/FormHelperText";

const FormikImageInput = ({ formikKey, valError, ...props }) => {
  const [field, meta, helpers] = useField(formikKey);
  const { setFieldValue } = useFormikContext();
  const [fileName, setFileName] = useState("");
  
  const handleChange = e => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    if (file) {
      reader.onloadend = () => setFileName(file.name);
      reader.readAsDataURL(file);
      setFieldValue(field.name, file);
    }
  };

  return (
    <FormControl margin="normal">
      <input
        style={{ display: "none" }}
        id="image-upload"
        name={field.name}
        type="file"
        accept="*"
        onChange={handleChange}
      />
      <label htmlFor="image-upload">
        <Button color="primary" margin="normal" component="span">
          <ImageIcon />
          {"Upload"}
        </Button>
      </label>
      {fileName ?
        <FormHelperText id="image-upload-filename">{fileName}</FormHelperText>
       : null}
      {meta.touched && Boolean(meta.error) || valError ?
        <FormHelperText id="image-upload-helper-text" error={true}>
          {meta.error ? meta.error : valError ? valError : ""}
        </FormHelperText>
       : null}
    </FormControl>
  );
}

export default FormikImageInput;