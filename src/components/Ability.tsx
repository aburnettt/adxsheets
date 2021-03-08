import React from 'react';
import {
    Button,
    Tooltip,
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
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Buff from './Buff';


interface IProps {
    name: string,
    action: string,
    value: string,
    effect: string,
    detail: string,
    buffs: Buff[],
    tags: string[],
    condition: string,
    color: string
}

export default class Ability extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
    }

  public  render() {


        return (
            <TableBody style={{ backgroundColor: this.props.color }}>
                <TableRow ><TableCell ><h5 >{this.props.name}</h5></TableCell></TableRow>
                <TableRow>
                    <TableCell padding="none">
                        {this.props.action}
                    </TableCell>
                    <TableCell padding="none">
                        {this.getPriority()}
                    </TableCell>
                    <TableCell padding="none" >
                        {this.props.value + " " + this.props.effect}
                        {this.props.detail && this.props.detail.length > 0 && (
                            <Tooltip title={this.props.detail.replaceAll("\"", "")} arrow interactive>
                                <Button>(?)</Button>
                            </Tooltip>
                        )}
                    </TableCell>
                </TableRow>
                {(this.props.buffs).map((buff, i) => {
                    return buff.renderAsBuffline(this.props.name);
                })}
            </TableBody>);
    }

    private getPriority() {
        return "1d20";
    }
    /*switch (buff.effect) {
                  case "Priority":
                    a["atk"] = buff.value;
                    break;
                  case "ATK":
                    a["atk"] += "+" + buff.value;
                    break;
                  case "DMG":
                    a["dmg"] += "+" + buff.value;
                    break;
                  default:
                    //do nothing, buffline will convey meaning
                    break;
                }
                a["bufflines"].push(buff);
              }
 */

    public tryOnBuff(b: Buff) {
        if (this.props.name === b.getSource() ||
            b.includesTags(this.props.tags)) {
            this.props.buffs.push(b);
        }
    }
}