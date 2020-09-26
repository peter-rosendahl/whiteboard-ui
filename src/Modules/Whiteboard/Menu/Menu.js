import React, { Component } from 'react';
import './Menu.css';
import Fab from '@material-ui/core/Fab';
import MeetingRoom from '@material-ui/icons/MeetingRoom';
// import Person from '@material-ui/icons/Person';
import Member from './../../../Models/Member';


class Menu extends Component {

    constructor(props) {
        super(props);

        this.signOut = this.signOut.bind(this);
    }


    signOut = () => {
        Member.reset();
        this.props.history.push('/');
    }

    render() {
        return (
            <div className='menu-section'>
                <Fab className='signout-fab' variant='extended' color='default' onClick={this.signOut}><MeetingRoom></MeetingRoom>&nbsp; Sign out</Fab>
                {/* <Fab className='profile-fab' variant='extended' color='primary'><Person></Person></Fab>  */}
            </div>
        )
    }
}

export default Menu;