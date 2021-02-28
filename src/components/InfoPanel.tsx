import React from 'react';
import {
    Tooltip,
    Button,
    Box
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



interface IProps {
    abilities: any[]
    buffs: any[]
}

interface IState {

}

export default class InfoPanel extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            abilityList: [],
            buffList: []
        };
    }


    render() {




        var abilityHeaders: string[] = [
            "Action",
            "Atk",
            "Effect"
        ]

        return (
            <Box display="flex">
                <Box minHeight="25%" width="30%" position="Left" display="flex">
                    <div style={{ width: '500px' }}>
                        <h3>Attributes</h3>
                    </div>
                </Box>
                <Box minHeight="25%" width="65%" position="right" display="flex">
                    <div style={{ width: '800px' }}>
                        <h3> Abilities</h3>

                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                {/*
                                Looks better without header IMO
                                <TableHead>
                                    <TableRow>
                                        {abilityHeaders.map((header, i) => {
                                            return (<TableCell><strong>{header}</strong></TableCell>)
                                        })}

                                    </TableRow>
                                </TableHead>
                                    */}
                                {this.props.abilities.map((a, i) => {
                                    return (<TableBody>
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
                                        </TableRow></TableBody>)
                                })}
                            </Table>
                        </TableContainer>

                    </div>
                </Box>
            </Box >
        )
    }

}
