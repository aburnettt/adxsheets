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
    if (Object.keys(this.props.selectedStats).length === 0) {
      //  not coming in with any selected stats
      var selectedStats: any = {};
      this.props.statData.forEach(row => {
        var stat: string = row["Stat"]; //this row's stat
        if (!selectedStats[stat]) {
          //we do not have an entry for this stat
          selectedStats[stat] = "H";
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
    var ss = JSON.parse(JSON.stringify(this.state.selectedStats));
    ss[stat] = value;
    this.setState({
      selectedStats: ss
    })
  }


  render() {
    //build output panel
    var humanRanks = [];

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
              var rank = this.state.selectedStats[stat];
              return (<React.Fragment>
                {stat}
                <select value={rank}
                  onChange={(e) => this.handleStatChange(stat, e.target.value)}>
                  {Object.keys(this.props.statData[0]).map((col, i) => {
                    if (col.startsWith("H")) {
                      return (<option value={col}>{col}</option>)
                    } else {
                      return;
                    }
                  })}
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
