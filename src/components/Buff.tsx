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
    value: string,
    effect: string,
    condition: string,
    source: string,
    detail: string,
    color: string,
    tags: string[]
}

export default class Buff extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
    }


    public render() {
        var text = this.props.value + " " + this.props.effect;
        var condition = (this.props.condition.length > 0) ? " when " + this.props.condition : "";
        var byline = "From " + this.props.source;

        return (<div style={{ backgroundColor: this.props.color }}>
            {text}{condition}
            <br />
            <small>{byline}</small>
        </div>);
    }

    public renderAsBuffline(abilityName: string) {
        return (<TableRow>
            <TableCell padding="none">
                {this.props.value +
                    " " +
                    this.props.effect +
                    (this.props.condition.length > 0 ? " when " + this.props.condition : "") +
                    (this.props.source === abilityName ? "" : " from " + this.props.source)
                }
            </TableCell>
        </TableRow>);
    }

    public includesTags(tag : string[]) {
        var includes = false;
        tag.forEach(t => {
            if (this.includesTag(t)){
                return true;
            }
        });
        return false;
    }

    public includesTag(tag : string) {
        return this.props.tags.includes(tag);
    }

    public getSource(){
        return this.props.source;
    }
}