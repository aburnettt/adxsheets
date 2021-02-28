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
    ability: any
}

interface IState {

}

export default class Ability extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
        };
    }


    render() {
        var a = this.props.ability as any;
        return (
            <TableBody>
                <TableRow><strong>{a["name"]}</strong></TableRow>
                <TableRow>
                    <TableCell>
                        {a["action"]}
                    </TableCell>
                    <TableCell>
                        {a["atk"]}
                    </TableCell>
                    <TableCell>
                        {a["dmg"] + " " + a["effect"]}
                        {a["detail"] && a["detail"].length > 0 && (
                            <Tooltip title={a["detail"].replaceAll("\"", "")} arrow interactive>
                                <Button>(?)</Button>
                            </Tooltip>
                        )}
                    </TableCell>
                </TableRow>
                {a["bufflines"].length > 0 &&
                    (a["bufflines"] as any[]).map((buff, i) => {
                        return (
                            <TableRow><small>
                                {buff["value"] +
                                    " " +
                                    buff["effect"] +
                                    (buff["condition"].length > 0 ? " when " + buff["condition"] : "") +
                                    (buff["power"] === a["name"] ? "" : " from " + buff["power"])
                                }
                            </small>
                            </TableRow>)
                    })}
            </TableBody>);
    }
}