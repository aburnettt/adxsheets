import React from 'react';
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  TextField,
  FormControl,
} from '@material-ui/core';
import BuyablePower from "./BuyablePower";

interface IProps {
  archData: any[];
  selectedArch: string | null;
  level: number | null;
  handleConfirm: (selectedArch: string, level: number) => void;
  handleClose: () => void;
}

interface IState {
  selectedArch: string;
  level: number;
}

export default class ManageArchPanel extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedArch: this.props.selectedArch ? this.props.selectedArch : "Standard",
      level: this.props.level ? this.props.level : 1
    };

    this.handleArchChange = this.handleArchChange.bind(this);
    this.handleLevelChange = this.handleLevelChange.bind(this);
  }
  componentDidMount() {

  }
  handleArchChange(event: any) {
    this.setState({ selectedArch: event.target.value });
  }

  handleLevelChange(event: any) {
    this.setState({ level: Number(event.target.value) });
  }

  render() {
    //build output panel
    var output = [];
    var level = this.state.level;
    var sa = this.state.selectedArch;
    var currentArch: string = "";
    return (
      <Dialog
        aria-describedby="Manage Archetype"
        aria-labelledby="Manage Archetype"
        className="manage-arch-dialog"
        fullWidth={true}
        onClose={this.props.handleClose}
        open={true}
      >
        <DialogTitle>Manage Archetype</DialogTitle>

        <DialogActions>
          <FormControl required variant="outlined">
            <select value={this.state.selectedArch}
              onChange={this.handleArchChange} >
              {this.buildArchOptions()}
            </select>
            <TextField
              id="level-input"
              label="Level"
              type="number"
              value={this.state.level ? this.state.level : 1}
              inputProps={{ min: "1", max: "10", step: "1" }}
              onChange={this.handleLevelChange}
              className="level-control"
            />
            {/*Output data about the current selection*/}
            <Container>
              <table>
                <tbody>
                  {this.props.archData.map((row, i) => {
                    if (row["Arch"] === sa) {
                      return (<tr>
                        <td>{row["Row"]}:</td>
                        <td>{row["Level " + level]}</td>
                      </tr>);
                    }
                  })
                  }
                </tbody>
              </table>
            </Container>
          </FormControl>
          <div className="actionButtons">
            <Button onClick={() => this.props.handleConfirm(this.state.selectedArch, this.state.level)} color="primary">Save</Button>
            <Button onClick={() => this.props.handleClose()} color="primary">Cancel</Button>
          </div>
        </DialogActions>
      </Dialog>
    );
  }

  buildArchOptions() {
    var arr: any[] = [];
    var currentArch = "";
    this.props.archData.forEach(row => {
      if (row["Arch"] && row["Arch"] !== currentArch) {
        //new row
        currentArch = row["Arch"];
        arr.push(
          <option
            value={currentArch}>
            {currentArch}
          </option>
        );
      }
    })
    return arr;
  }



}
