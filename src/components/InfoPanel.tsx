import React from 'react';
import {
    Tooltip,
    Button,
    Box
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Ability from "./Ability";
import Buff from "./Buff";




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
                        {this.props.buffs.map((b,i) => {
                            return (<Buff
                            key = {i}
                            buff = {b}/>);
                        })}
                    </div>
                </Box>
                <Box minHeight="25%" width="65%" position="right" display="flex">
                    <div style={{ width: '800px' }}>
                        <h3> Abilities</h3>

                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                {this.props.abilities.map((a, i) => {
                                    return (<Ability key={i} 
                                        ability={a} />
                                )})}
                            </Table>
                        </TableContainer>

                    </div>
                </Box>
            </Box >
        )
    }

}
