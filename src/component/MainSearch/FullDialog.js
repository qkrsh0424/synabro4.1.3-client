import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import MainSearchPresenter from "./index";
import { red } from "@material-ui/core/colors";
// import Loader from "../Loader";
import PostList from "../Univ/layout/PostLists";
import { calculateTime } from "./handler";
import Message from "./message";
import SearchIcon from '@material-ui/icons/Search';

const styles = {
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },
  button: {
    padding: 0,
    fontSize: "12px"
  }
};
const Box=styled.div`
width:90%;
height:90%;
background-color:#74b9ff;
`;

const Form = styled.form`
  margin-bottom: 50px;
  width: 100%;
`;
const Input = styled.input`
  all: unset;
  font-size: 28px;
  width: 100%;
  -webkit-transform: translateY(23px);
  transform: translateY(23px);
`;

const Container = styled.div`
  .button {
    padding: 10px 20px;
    width: 100%;
    box-shadow: 0 7px 14px rgba(0, 0, 0, 0.25), 0 3px 3px rgba(0, 0, 0, 0.22);
    border-radius: 0.25rem;
  }
`;

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
      // console.log(this.props);
    const { 
        classes,
        
    } = this.props;
    return (
      <Container>
        <Button color="primary" onClick={this.handleClickOpen}>
          <p className="button "><SearchIcon />모든 게시판의 정보를 빠르게 검색해보세요.</p>
        </Button>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={this.Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                onClick={this.handleClose}
                aria-label="Close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" className={classes.flex}>
              </Typography>
            </Toolbar>
          </AppBar>
          <div className="container">
            <div className="row">
            <div className="col-md-9">
              <MainSearchPresenter />
              </div>
              <div className="col-md-3">
              {/* 배너광고를 넣을까? */}
              </div>
            </div>
          </div>
        </Dialog>
      </Container>
    );
  }
}

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FullScreenDialog);
