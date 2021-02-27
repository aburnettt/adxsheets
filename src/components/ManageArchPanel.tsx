import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Input
} from '@material-ui/core';
import BuyablePower from "./BuyablePower";

interface IProps {
  archData: any[];
  selectedArch: string;
  level: number
  handleConfirm: (selectedArch: string, level: number) => void;
  handleClose: () => void;
}

interface IState {
  selectedArch: string;
  level: number;
}

export default class ManagePowersPanel extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedArch: "Standard",
      level: 0
    };
  }
  componentDidMount() {

  }
  handleArchChange(event: any) { 
    this.setState({ selectedArch: event.target.value }); 
  }

  handleLevelChange(event: any) { 
    this.setState({ level: event.target.value }); 
  }

  render() {
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
            <select value={this.state.selectedArch} onChange={this.handleArchChange}>            <option value="grapefruit">Grapefruit</option>
              {
                this.props.archData.array.forEach(row => {
                  //do something
                });
              }
            </select>
            <TextField
              id="level-input"
              label="Level"
              type="number"
              inputProps={{ min: "1", max: "10", step: "1" }}
              onChange={val => this.setState({ level: Number(val) })}
              className="level-control"
            />
  q

            </FormControl>
          <div className="actionButtons">
            <Button onClick={() => this.props.handleConfirm(this.state.selectedArch, this.state.level)} color="primary">Save</Button>
            <Button onClick={() => this.props.handleClose()} color="primary">Cancel</Button>
          </div>
        </DialogActions>
      </Dialog>
    );
  }



}
