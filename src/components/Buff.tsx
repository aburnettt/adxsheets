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
import Ability from './Ability';
import Natural from './Natural';


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
        //render in the BUFF PANEL. this means
        //only those with passive tag
        if (!this.props.tags.includes("passive")){
            return ;
        }
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
    public appliesTo(a: Ability | Natural) {
        var name: String = a.getName();
        var tags: String[] = a.getTags();

        if (this.props.source === name) {
            return true;
        }

        var applies = false;
        this.props.tags.forEach(myTag => {
            tags.forEach(otherTag => {
                if (myTag === otherTag ||
                    myTag === name) {
                    applies = true;
                }
            })
        });
        return applies;
    }

    public getValue(){
        return this.props.value;
    }

    public getEffect(){
        return this.props.effect;
    }

    public getTags() : string[]{
        return this.props.tags;
    }

    public getName() : string{
        return this.props.source;
    }
}