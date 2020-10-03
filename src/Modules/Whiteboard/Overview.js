import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Whiteboard from './Whiteboard';
import TabOverview from './Tab/Tab';
import Menu from './Menu/Menu';
import Member from './../../Models/Member';
import './Overview.css';
import * as appConfig from './../../appConfig.json';

class Overview extends Component {

    constructor(props) {
        super(props);
        if (props.location.state && props.location.state.detail) {
            this.state = {
                whiteboards: [],
                postits: [],
                userId: props.location.state.detail.id,
                isFetchingBoards: false,
                isFetchingNotes: false
            }
        } else {
            this.state = {
                whiteboards: [],
                postits: [],
                userId: Member.getId(),
                isFetchingBoards: false
            }
        }
        this.getWhiteboards = this.getWhiteboards.bind(this);
        this.createWhiteboard = this.createWhiteboard.bind(this);
        this.createPostit = this.createPostit.bind(this);
        this.getPostits = this.getPostits.bind(this);
    }

    componentDidMount = function () {
        var token = JSON.parse(sessionStorage.getItem('WHITEBOARD_TOKEN'));
        if ( token !== null) {
            console.log('token', token);
            Member.setToken(token);
            this.getWhiteboards(true);
        } else {
            this.props.history.push('/');
        }
    }

    createWhiteboard() {
        const title = `Whiteboard ${this.state.whiteboards.length + 1}`;
        fetch(appConfig.connectionString + "/Whiteboard/Insert?userId=" + this.state.userId + "&title=" + title, this.getRequestOptions('POST'))
            .then(response => {
                this.getWhiteboards();
            })
    }

    createPostit() {
        fetch(appConfig.connectionString + "/Postit/Insert?boardId=" + this.state.active.id, this.getRequestOptions('POST'))
            .then(responseValue => responseValue.json)
            .then(response => {
                this.getPostits(this.state.active.id);
            })
    }

    updateTitle = title => {
        const board = this.state.active;
        board.title = title;
        let requestOptions = this.getRequestOptions('PUT');
        requestOptions.body = JSON.stringify(board);
        fetch(appConfig.connectionString + "/Whiteboard/Update", requestOptions)
            .then(response => {
                this.getWhiteboards();
            })
    }

    updateNote = (note) => {
        const requestOptions = this.getRequestOptions('PUT');
        requestOptions.body = JSON.stringify(note);
        
        fetch(appConfig.connectionString + "/Postit/Update", requestOptions)
            .then(response => {
                // this.getWhiteboards();
            })
    }

    deleteBoard = boardId => {
        fetch(appConfig.connectionString + "/Whiteboard/Delete?userId=" + this.state.userId + "&boardId=" + boardId, this.getRequestOptions('DELETE'))
            .then(response => {
                this.getWhiteboards(true);
            })
    }

    deleteNote = noteId => {
        fetch(appConfig.connectionString + "/Postit/Delete?userId=" + this.state.userId + "&postitId=" + noteId, this.getRequestOptions('DELETE'))
            .then(response => {
                this.getWhiteboards();
            })
    }

    setBoardActive = tabId => {
        const activeBoard = this.state.whiteboards.find(x => x.id === tabId);
        this.setState(state => ({
            active: activeBoard,
            isFetchingNotes: true
        }));
        this.getPostits(activeBoard.id);
    }

    getWhiteboards(setFirstToActive = false) {
        this.setState(state => ({isFetchingBoards: true}));
        fetch(appConfig.connectionString + "/Whiteboard/Get?userId=" + this.state.userId, this.getRequestOptions('GET'))
            .then(response => typeof response !== 'undefined' ? response.json() : null)
            .then(value => {
                if (value.length > 0) {
                    this.setState(state => ({ 
                        whiteboards: value, 
                        active: setFirstToActive ? value[0] : this.state.active,
                        isFetchingBoards: false,
                        isFetchingNotes: true
                    }));
                    this.getPostits(this.state.active.id);
                } else {
                    this.setState(state => ({isFetchingBoards: false}));
                }
            })
    }

    getPostits(boardId) {
        fetch(appConfig.connectionString + "/Postit/Get?boardId=" + boardId, this.getRequestOptions('GET'))
            .then(response => response.json())
            .then(value => {
                this.setState(state => ({ 
                    isFetchingNotes: false,
                    postits: value
                }));
            })
    }

    getRequestOptions = methodType => {
        return {
            method: methodType,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Member.getToken()}`
            }
        }
    }

    render() {
        return (
            <React.Fragment>
                <Menu history={this.props.history}></Menu>
                { this.state.isFetchingBoards && 
                    <div className="loading-overlay">
                        <CircularProgress size={52} color="default" />
                    </div>
                }
                { this.state.whiteboards.length > 0 
                    ? <Whiteboard 
                        isFetchingNotes={this.state.isFetchingNotes}
                        postits={this.state.postits} 
                        title={ this.state.active.title } 
                        board={ this.state.active }
                        createPostit={ this.createPostit }
                        updateTitle={ this.updateTitle }
                        updateNote={this.updateNote}
                        deleteNote={this.deleteNote} /> 
                    : ''
                }
                {
                    this.state.whiteboards.length === 0 && !this.state.isFetchingBoards &&
                    <div className="loading-overlay">
                        <h1>You seem to have no whiteboard available</h1>
                        <h4>Add a whiteboard <br />by pressing the + icon at the bottom left corner <br />to get started</h4>
                    </div>
                }
                <TabOverview 
                    boards={this.state.whiteboards} 
                    active={this.state.active}
                    activateBoard={this.setBoardActive}
                    onCreateBoard={this.createWhiteboard}
                    delete={ this.deleteBoard } /> 
            </React.Fragment>
        )
    }
}

export default Overview;