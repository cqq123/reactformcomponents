import React, { Component } from 'react';

class UploadFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectFile: null,
    };
  }
  fileChangedHandler = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  }
  uploadHandler = () => {
    console.log('this.state.selectedFile: ', this.state.selectedFile);
    const formData = new FormData();
    formData.append('fileupload', this.state.selectedFile, this.state.selectedFile.name);
    fetch('/upload', {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });
  }
  render() {
    return (
      <div>
        <form ref={(form) => { this.form = form; }}>
          <input type="file" name="fileupload" onChange={this.fileChangedHandler} />
        </form>
        <button onClick={this.uploadHandler}>Upload!</button>
      </div>
    );
  }
}

export default UploadFile;
