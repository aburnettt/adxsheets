import React from 'react';
import {
    Button
} from '@material-ui/core';


interface IProps {
    name: string;
    majorCost: number;
    minorCost: number;
    lesserCost: number;
    purchase: any;
    purchased: number;
    remainingCP: number;
}

interface IState {
    purchased: number; //1-2-3 for lesser-minor-major. 0 is nothing
}

export default class BuyablePower extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            purchased: this.props.purchased
        };
    }

    setPurchased(level: number, cost: number) {
        this.setState({
            purchased: level
        })
        this.props.purchase(this.props.name, level, cost);
    }

    componentDidMount() {
    }


    render() {
        if (this.state.purchased == 0) {
            var remainingCP = Number(this.props.remainingCP); //weird bug makes me do this
            return (
                <tr>
                    <td>{this.props.name}</td>
                    <td>
                        {this.props.majorCost > 0 &&
                            this.props.majorCost <= remainingCP &&
                            (<Button
                                color="primary"
                                variant="contained"
                                onClick={() => this.setPurchased(3, this.props.majorCost)}>
                                {this.props.majorCost} </Button>)}
                    </td>
                    <td>
                        {this.props.minorCost > 0 &&
                            this.props.minorCost <= remainingCP &&
                            (<Button
                                color="primary"
                                variant="contained"
                                onClick={() => this.setPurchased(2, this.props.minorCost)}>
                                {this.props.minorCost} </Button>)}
                    </td>
                    <td>
                        {this.props.lesserCost > 0 &&
                            this.props.lesserCost <= remainingCP &&

                            (<Button
                                color="primary"
                                variant="contained"
                                onClick={() => this.setPurchased(1, this.props.lesserCost)}>
                                {this.props.lesserCost} </Button>)}
                    </td>
                </tr>
            )
        } else {
            return (
                <tr>
                    <td>{this.props.name}</td>
                    <td>
                        {this.state.purchased == 3 && (
                            <Button
                                color="secondary"
                                variant="contained"
                                onClick={() => this.setPurchased(0, 0 - this.props.majorCost)}>
                                X </Button>)}
                    </td>
                    <td>
                        {this.state.purchased == 2 && (
                            <Button
                                color="secondary"
                                variant="contained"
                                onClick={() => this.setPurchased(0, 0 - this.props.minorCost)}>
                                X </Button>)}
                    </td>
                    <td>
                        {this.state.purchased == 1 && (
                            <Button
                                color="secondary"
                                variant="contained"
                                onClick={() => this.setPurchased(0, 0 - this.props.lesserCost)}>
                                X </Button>)}
                    </td>
                </tr>
            )
        }
    }
}