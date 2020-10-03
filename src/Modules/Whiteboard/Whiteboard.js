import React, { Component, createRef } from 'react';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Postit from './Postit/Postit';
import NoteAdd from '@material-ui/icons/NoteAdd';
import SendRounded from '@material-ui/icons/SendRounded';
import './Whiteboard.scss';

class Whiteboard extends Component {

    constructor(props) {
        super(props);
        this.titleClick = this.titleClick.bind(this);
        this.frameRef = createRef();
        this.state = {
            titleModalOpen: false,
            title: this.props.title,
            activeNoteId: 0
        }
    }

    // handleEvent = (e, data) => {
    //     console.log('Event Type', e.type);
    //     console.log(e, data);
    // }

    titleClick = () => {
        if (!this.state.titleModalOpen) {
            this.setState({
                titleModalOpen: true
            })
        } else {
            this.setState({
                titleModalOpen: false
            })
        }
    }

    onModalClose = () => {
        this.setState({
            titleModalOpen: false
        });
    }

    onInputChange = (value) => {
        this.setState({
            title: value
        })
    }

    onTitleUpdate = (event) => {
        event.preventDefault();
        this.props.updateTitle(this.state.title);
        this.setState({title: '', titleModalOpen: false});
    }

    setActiveNote = (note, item) => {
        this.setState({activeNoteId: item.id});
    }
    
    render() {
        return (
                <div className='whiteboard-wrapper'>
                    <h1 onClick={this.titleClick} className="clickable">
                        {this.props.title}
                    </h1>
                    <div className='whiteboard-frame' ref={this.frameRef}>
                        <div className='inner-space' ref={this.wrapper}>
                            { this.props.isFetchingNotes && 
                                <div className="board-overlay">
                                    <CircularProgress size={52} color="default" />
                                </div>
                            }
                            { !this.props.isFetchingNotes && this.props.postits.map((item) => (
                                <Postit 
                                    onNoteClick={(note) => this.setActiveNote(note, item)}
                                    updateNote={this.props.updateNote}
                                    deleteNote={this.props.deleteNote}
                                    parent={this.frameRef.current}
                                    key={item.id}
                                    id={item.id}
                                    note={item}
                                    active={this.state.activeNoteId === item.id}
                                    className='note'
                                    width={item.width}
                                    height={item.height}
                                    colorCode={item.colorCode}
                                    content={item.content} 
                                    posX={item.posX} 
                                    posY={item.posY} />
                                )
                            ) }
                        </div>
                    </div>
                    
                    <Fab className='whiteboard-fab' variant='round' color='primary' onClick={this.props.createPostit}><NoteAdd></NoteAdd></Fab>
                    <Dialog open={this.state.titleModalOpen} onClose={this.onModalClose}>
                        <DialogContent>
                            <Form onSubmit={this.onTitleUpdate}>
                                <Form.Row>
                                    <TextField 
                                        label="Title"
                                        value={this.state.title} 
                                        // ref={this.userName}
                                        onChange={(e) => this.onInputChange(e.target.value)}
                                        />
                                    <Button type='submit' variant='secondary' className=''><SendRounded></SendRounded></Button>
                                </Form.Row>
                            </Form>
                        </DialogContent>
                    </Dialog>
                </div>
        );
    }
}

export default Whiteboard;