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
  powerData: any[];
  totalCP: number;
  selectedPowers: any;
  handleConfirm: (selectedPowers: any) => void;
  handleClose: () => void;
}

interface IState {
  selectedPowers: any;
  remainingCP: number;
}

export default class ManagePowersPanel extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      selectedPowers: this.props.selectedPowers,
      remainingCP: this.props.totalCP
    };
  }
  componentDidMount() {

  }

  render() {
    return (
      <Dialog
        aria-describedby="Manage Powers"
        aria-labelledby="Manage Powers"
        className="manage-powers-dialog"
        fullWidth={true}
        onClose={this.props.handleClose}
        open={true}
      >
        <DialogTitle>Manage Powers</DialogTitle>

        <DialogActions>
          <form onSubmit={(selectedPowers: any) => this.props.handleConfirm(this.state.selectedPowers)} >
            <FormControl required variant="outlined">
              Remaining CP: {this.state.remainingCP}


              {/*
                </FormControl>
                <FormControl className="inputControl">
              */}
              <table><thead><tr><th>Power</th><th>Major</th><th>Minor</th><th>Lesser</th></tr></thead>
                <tbody>
                  {this.props.powerData && this.props.powerData.map((row: any[string]) => {
                    if (row["Major"] || row["Minor"] || row["Lesser"]) {
                      //buyable power
                      return (
                        <BuyablePower
                          name={row["Power"]}
                          majorCost={row["Major"]}
                          minorCost={row["Minor"]}
                          lesserCost={row["Lesser"]}
                          purchase={(name: string, level: number, cost: number) => this.purchasePower(name, level, cost)}
                          purchased={this.state.selectedPowers[row["Power"]] ? this.state.selectedPowers[row["Power"]] : 0}
                          remainingCP={this.state.remainingCP}
                        />
                      )
                    }
                  })}
                </tbody>
              </table>

            </FormControl>
            <div className="actionButtons">
              <Button onClick={() => this.props.handleConfirm(this.state.selectedPowers)} color="primary">Save</Button>
              <Button onClick={() => this.props.handleClose()} color="primary">Cancel</Button>
            </div>
          </form>
        </DialogActions>
      </Dialog>
    );
  }

  public purchasePower(name: string, level: number, cost: number) {
    this.state.selectedPowers[name] = level;
    this.setState({
      //bug since this is done async
      remainingCP: this.state.remainingCP - cost
    })
  }

}
