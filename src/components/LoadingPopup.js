import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import "../scss/components/LoadingPopup.scss"

const LoadingPopup = () => {
  return (
    <div>
      <Dialog
        open={this.props.openLoadingPopup}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>    
          <div className="loading-circle">
            <CircularProgress /> 
          </div>
          <div className="loading-text">
            {"Loading"}
          </div>
          
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default LoadingPopup;