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
    value: string,
    buffs: Buff[]
}

export default class Natural extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
    }

    public render() {
        return (<li>
            <strong>
                {this.props.name}: {this.props.value}
            </strong>
        </li>);
    }

    public getName() {
        return this.props.name;
    }

    public getTags() {
        return [];
    }


    public addBuff(b: Buff) {
        this.props.buffs.push(b);
    }
}