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

    public render() {


        return (
            <TableBody style={{ backgroundColor: this.props.color }}>
                <TableRow ><TableCell><h5 >{this.props.name}</h5></TableCell></TableRow>
                <TableRow>
                    <TableCell padding="none">
                        {this.props.action}
                    </TableCell>
                    <TableCell padding="none">
                        {this.getPriority()}
                    </TableCell>
                    <TableCell padding="none" >
                        {this.getValue() + " " + this.props.effect}
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


    public getName() {
        return this.props.name;
    }

    public getTags() {
        return this.props.tags;
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

    private getPriority(): string {
        var modifier = 0;
        if (this.props.tags.includes("atk")) {
            //this is an ATK roll
            this.props.buffs.forEach(b => {
                if (b.getTags().includes("atk") || b.getTags().includes("priority")) {
                    if (/^\d$/.test(b.getValue())) {
                        modifier += Number(b.getValue());
                    } else {
                        //it's an atk or priority buff but not a number? strange. 
                        console.log("strange interaction between " + this.props.name + " and buff " + b.getName());
                    }
                }
            });
            return "1d20" + (modifier > 0 ? " + "+modifier : "");
        } else {
            //this is NOT an atk roll

            //currently unsupported. display nothing
            // this.props.buffs.forEach(b => {
            //     if (b.getTags().includes("priority")) {
            //         if (/^\d$/.test(b.getValue())) {
            //             modifier += Number(b.getValue());
            //         }
            //     }
            // });
            return "";
        }
      //  return this.returnModifiedValue(modifier) as string;
    }

    private getValue() {
        var modifier = 0;
        this.props.buffs.forEach(b => {
            if (b.getEffect() === this.props.effect) {
                if (/^\d$/.test(b.getValue())) {
                    modifier += Number(b.getValue());
                } else {
                    //modifier is not a number but effect is same? odd
                    console.log("strange modifier in " + this.props.name);
                }
            }
        });
        return this.returnModifiedValue(this.props.value, modifier);
    }

    private returnModifiedValue(value: string, modifier: Number) {
        if (modifier > 0) {
            if (/^[\d]+$/.test(value)) {
                //numeric value with a modifier
                return Number(value) + Number(modifier) + " ("+value + " + " + modifier+ ")";
            } else {
                //non-numeric value with a modifier
                return value + " + " + modifier;
            }
        }
        return value;
    }

    public addBuff(b: Buff) {

        this.props.buffs.push(b);
    }
}