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
  statData: any[];
  selectedStats: any;
  handleConfirm: (statd: any) => void;
  handleClose: () => void;
}

interface IState {
  selectedStats: any;
}

export default class ManageStatsPanel extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    if (this.props.selectedStats === {}) {
      //  not coming in with any selected stats
      var selectedStats: any = {};
      this.props.statData.forEach(row => {
        var stat: string = row["Stat"]; //this row's stat
        if (selectedStats[stat] === null) {
          //we do not have an entry for this stat
          selectedStats[stat] = "h";
        }
      })
      this.state = {
        selectedStats: selectedStats
      };
    } else {
      this.state = {
        selectedStats: this.props.selectedStats
      };
    }
    this.handleStatChange = this.handleStatChange.bind(this);
  }
  componentDidMount() {

  }
  handleStatChange(stat: string, value: string) {
    //TODO make this the safe array push
    this.state.selectedStats[stat] = value;
  }


  render() {
    //build output panel
    var selectedStats = this.state.selectedStats;
    var statChange = this.handleStatChange;


    return (
      <Dialog
        aria-describedby="Manage Archetype"
        aria-labelledby="Manage Archetype"
        className="manage-arch-dialog"
        fullWidth={true}
        onClose={this.props.handleClose}
        open={true}
      >
        <DialogTitle>Manage Stats</DialogTitle>

        <DialogActions>
          <FormControl required variant="outlined">
            {Object.keys(this.state.selectedStats).map((stat, i) => {
              alert(stat);
              return (<React.Fragment>
                <select value={stat}
                  onChange={(e) => statChange(stat, e.target.value)}>
                  {stat}
                </select>
                {/*output data about this stat */}
              </React.Fragment>);
            })
            }
          </FormControl>
          <div className="actionButtons">
            <Button onClick={() => this.props.handleConfirm(this.state.selectedStats)} color="primary">Save</Button>
            <Button onClick={() => this.props.handleClose()} color="primary">Cancel</Button>
          </div>
        </DialogActions>
      </Dialog>
    );
  }



}
