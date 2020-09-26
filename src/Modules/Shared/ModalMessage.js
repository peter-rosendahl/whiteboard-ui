import React, {Component} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

class ModalMessage extends Component {
    
    render() {
        return (
            <Dialog open={this.props.open} onClose={this.props.onClose}>
                <DialogTitle>{this.props.headline}</DialogTitle>
                <DialogContent>
                    <p>{this.props.content}</p>
                </DialogContent>
            </Dialog>
        );
    }
}

export default ModalMessage;