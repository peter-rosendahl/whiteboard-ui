import React, { useState } from 'react';
import MoreVert from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import CloseIcon from '@material-ui/icons/Close';
import Draggable from 'react-draggable';
import './Postit.css';

export default function Postit(props) {

    const inputRef = React.createRef();
    const [content, setContent] = useState(props.content);
    const postitStyle = {
        position: 'absolute',
        width: '200px',
        height: 'max-content',
        top: `${props.posY}%`,
        left: `${props.posX}%`,
        background: props.colorCode
    }

    const onDragStart = (e, data) => {}

    const onDragStop = (e, data) => {
        props.onNoteClick(props);
        var newPosition = calculatePosition(data);
        var note = props.note;
        note.posX = parseInt(newPosition.posX);
        note.posY = parseInt(newPosition.posY);
        props.updateNote(note);
    }

    const onInputBlur = (value => {
        var newNote = props.note;
        newNote.content = value;
        props.updateNote(newNote);
    })

    const calculatePosition = (data) => {
        var orgPositionInPct = { posX: props.posX, posY: props.posY };
        var outerCanvasInPxl = { width: props.parent.clientWidth, height: props.parent.clientHeight };
        var orgPositionInPxl = {
            posX: getPxlFromPct(orgPositionInPct.posX, (outerCanvasInPxl.width-40)),
            posY: getPxlFromPct(orgPositionInPct.posY, (outerCanvasInPxl.height-40))
        }
        var positionMovementInPxl = { posX: data.x, posY: data.y };
        var newXpx = orgPositionInPxl.posX + positionMovementInPxl.posX;
        var newYpx = orgPositionInPxl.posY + positionMovementInPxl.posY;
        var newPositionInPxl = {
            posX: newXpx > 0 ? newXpx : 0,
            posY: newYpx > 0 ? newYpx : 0
        }
        var newXpct = getPercentage(newPositionInPxl.posX, (outerCanvasInPxl.width-40));
        var newYpct = getPercentage(newPositionInPxl.posY, (outerCanvasInPxl.height-40));
        var newPositionInPct = {
            posX: newXpct < 100 ? newXpct : 100,
            posY: newYpct < 100 ? newYpct : 100
        }
        return newPositionInPct;
    }

    const getPxlFromPct = (objectRef, canvasRef) => {
        return ((canvasRef / 100) * objectRef);
    }

    const getPercentage = (objectRef, canvasRef) => {
        return ((objectRef / canvasRef) * 100);
    }

    return (
        <Draggable 
            handle='.postit-header' 
            bounds='parent'
            enableUserSelectHack={false}
            onStart={onDragStart}
            onStop={onDragStop}>
            <div className='postit' style={postitStyle}>
                <div className='postit-header'>
                    <CloseIcon fontSize="small" className="closeBtn" onClick={() => props.deleteNote(props.id)}></CloseIcon>
                </div>
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
                        inputRef={inputRef}
                        // label={props.id}
                        multiline
                        value={content || undefined} 
                        // ref={this.userName}
                        // onChange={(e) => this.onInputChange(e.target.value)}
                        onChange={e => setContent(e.target.value)}
                        onBlur={(e) => onInputBlur(e.target.value)}
                        />
                </div>
            </div>
        </Draggable>
    );
}