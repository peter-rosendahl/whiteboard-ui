import React from 'react';
import MoreVert from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Cancel from '@material-ui/icons/Cancel';
import Draggable from 'react-draggable';
import './Postit.css';

class Postit extends React.Component {

    constructor(props) {
        super(props);
        this.wrapper = React.createRef();
        this.state = {
            id: props.id,
            content: props.content
        }

        this.onDragStop = this.onDragStop.bind(this);
    }
    postitStyle = {
        position: 'absolute',
        width: '200px',
        height: 'max-content',
        top: `${this.props.posY}%`,
        left: `${this.props.posX}%`,
        background: this.props.colorCode
    }

    onDragStart = (e, data) => {
        // console.log('onDragStart', data);
    }

    onDragStop = (e, data) => {
        // console.log('onDragStop', data, this.props.posX, this.props.posY);
        // console.log('note is active', this.props.active)
        this.props.onNoteClick(this.props);
        var newPosition = this.calculatePosition(data);
        var note = this.props.note;
        note.posX = parseInt(newPosition.posX);
        note.posY = parseInt(newPosition.posY);
        this.props.updateNote(note);
    }

    onInputChange = (value) => {
        this.setState({content: value});
    }

    onInputBlur = (value => {
        var newNote = this.props.note;
        newNote.content = value;
        this.props.updateNote(newNote);
    })

    calculatePosition = (data) => {
        var orgPositionInPct = { posX: this.props.posX, posY: this.props.posY };
        var outerCanvasInPxl = { width: this.props.parent.clientWidth, height: this.props.parent.clientHeight };
        var orgPositionInPxl = {
            posX: this.getPxlFromPct(orgPositionInPct.posX, (outerCanvasInPxl.width-40)),
            posY: this.getPxlFromPct(orgPositionInPct.posY, (outerCanvasInPxl.height-40))
        }
        var positionMovementInPxl = { posX: data.x, posY: data.y };
        var newXpx = orgPositionInPxl.posX + positionMovementInPxl.posX;
        var newYpx = orgPositionInPxl.posY + positionMovementInPxl.posY;
        var newPositionInPxl = {
            posX: newXpx > 0 ? newXpx : 0,
            posY: newYpx > 0 ? newYpx : 0
        }
        var newXpct = this.getPercentage(newPositionInPxl.posX, (outerCanvasInPxl.width-40));
        var newYpct = this.getPercentage(newPositionInPxl.posY, (outerCanvasInPxl.height-40));
        var newPositionInPct = {
            posX: newXpct < 100 ? newXpct : 100,
            posY: newYpct < 100 ? newYpct : 100
        }
        return newPositionInPct;
    }

    getPxlFromPct = (objectRef, canvasRef) => {
        return ((canvasRef / 100) * objectRef);
    }

    getPercentage = (objectRef, canvasRef) => {
        return ((objectRef / canvasRef) * 100);
    }

    render() {
        return (
            <Draggable 
                handle='.postit' 
                bounds='parent'
                enableUserSelectHack={false}
                onStart={this.onDragStart}
                onStop={this.onDragStop}>
                <div className='postit' style={this.postitStyle}>
                    <Cancel fontSize="small" className="closeBtn" onClick={() => this.props.deleteNote(this.props.id)}></Cancel>
                    <Grid
                        container
                        direction='row'
                        justify='flex-end'>
                        <IconButton className='context-icon' aria-label='see more'>
                            <MoreVert />
                        </IconButton>
                    </Grid>
                    
                    <div className='postit-content'>
                        {/* <p>{this.props.content}</p> */}
                        <TextField 
                            label={this.props.id}
                            multiline
                            value={this.state.content || undefined} 
                            // ref={this.userName}
                            onChange={(e) => this.onInputChange(e.target.value)}
                            onBlur={(e) => this.onInputBlur(e.target.value)}
                            />
                    </div>
                </div>
            </Draggable>
        );
    }
}

export default Postit;