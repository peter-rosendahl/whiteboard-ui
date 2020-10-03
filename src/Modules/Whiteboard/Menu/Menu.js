import React from 'react';
import './Menu.scss';
import Fab from '@material-ui/core/Fab';
import MeetingRoom from '@material-ui/icons/MeetingRoom';
// import Person from '@material-ui/icons/Person';
import Member from './../../../Models/Member';


export default function Menu(props) {

    const signOut = () => {
        Member.reset();
        props.history.push('/');
    }

    return (
        <div className='menu-section'>
            <Fab className='signout-fab' variant='extended' color='default' onClick={signOut}><MeetingRoom></MeetingRoom>&nbsp; Sign out</Fab>
            {/* <Fab className='profile-fab' variant='extended' color='primary'><Person></Person></Fab>  */}
        </div>
    )
}