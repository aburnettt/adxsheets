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


interface IProps {
    buff: any
    color: string
}

interface IState {

}

export default class Buff extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
        };
    }


    render() {
        var b = this.props.buff as any;
        /*
            var buff = {
            power: power["Power"],
            effect: power["Effect"],
            value:  power["r" + rank],
            condition: power["Condition"]
          }
        */
        var text = b.value + " " + b.effect;
        var condition = (b.condition && b.condition.length > 0) ? " when " + b.condition : "";
        var byline = "From " + b.power;

        return (<div style={{ backgroundColor: this.props.color }}>
            {text}{condition}
        <br />
            <small>{byline}</small>
        </div>);
    }
}