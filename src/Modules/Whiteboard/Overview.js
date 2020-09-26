import React, { Component } from 'react';
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
                userId: props.location.state.detail.id
            }
        } else {
            this.state = {
                whiteboards: [],
                postits: [],
                userId: Member.getId()
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
        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 
        //         'Content-Type': 'application/json', 
        //         'Authorization': `Bearer ${Member.getToken()}`
        //     }
        // };
        fetch(appConfig.connectionString + "/Whiteboard/Insert?userId=" + this.state.userId + "&title=" + title, this.getRequestOptions('POST'))
            .then(response => {
                this.getWhiteboards();
            })
    }

    createPostit() {
        // const requestOptions = {
        //     method: 'POST',
        //     headers: { 
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${Member.getToken()}`
        //     }
        // };
        fetch(appConfig.connectionString + "/Postit/Insert?boardId=" + this.state.active.id, this.getRequestOptions('POST'))
            .then(responseValue => responseValue.json)
            .then(response => {
                this.getPostits(this.state.active.id);
            })
    }

    // updateNotes = notes => {
    //     this.setState(state => ({ postits: notes }));
    // }

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
                this.getWhiteboards();
            })
    }

    deleteBoard = boardId => {
        // const requestOptions = {
        //     method: 'DELETE',
        //     headers: { 
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${Member.getToken()}`
        //     }
        // };
        fetch(appConfig.connectionString + "/Whiteboard/Delete?userId=" + this.state.userId + "&boardId=" + boardId, this.getRequestOptions('DELETE'))
            .then(response => {
                this.getWhiteboards(true);
            })
    }

    deleteNote = noteId => {
        // const requestOptions = {
        //     method: 'DELETE',
        //     headers: { 
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${Member.getToken()}`
        //     }
        // };
        fetch(appConfig.connectionString + "/Postit/Delete?userId=" + this.state.userId + "&postitId=" + noteId, this.getRequestOptions('DELETE'))
            .then(response => {
                this.getWhiteboards();
            })
    }

    setBoardActive = tabId => {
        const activeBoard = this.state.whiteboards.find(x => x.id === tabId);
        this.setState(state => ({
            active: activeBoard
        }));
        this.getPostits(activeBoard.id);
    }

    getWhiteboards(setFirstToActive = false) {
        // const requestOptions = {
        //     method: 'GET',
        //     headers: { 'Content-Type': 'application/json' }
        // };
        fetch(appConfig.connectionString + "/Whiteboard/Get?userId=" + this.state.userId, this.getRequestOptions('GET'))
            .then(response => typeof response !== 'undefined' ? response.json() : null)
            .then(value => {
                console.log('whiteboards', value);
                if (value.length > 0) {
                    this.setState(state => ({ 
                        whiteboards: value, 
                        active: setFirstToActive ? value[0] : this.state.active
                    }));
                    this.getPostits(this.state.active.id);
                } else {
                    alert('Error on getting whiteboards from the DB.');
                }
            })
    }

    getPostits(boardId) {
        // const requestOptions = {
        //     method: 'GET',
        //     headers: { 'Content-Type': 'application/json' }
        // };
        fetch(appConfig.connectionString + "/Postit/Get?boardId=" + boardId, this.getRequestOptions('GET'))
            .then(response => response.json())
            .then(value => {
                this.setState(state => ({ 
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
                { this.state.whiteboards.length > 0 
                    ? <Whiteboard 
                        postits={this.state.postits} 
                        title={ this.state.active.title } 
                        board={ this.state.active }
                        createPostit={ this.createPostit }
                        updateTitle={ this.updateTitle }
                        updateNote={this.updateNote}
                        deleteNote={this.deleteNote} /> 
                    : ''
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