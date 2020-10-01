import './Tab.css';
import React from 'react';
import TabItem from './TabItem';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

export default function TabOverview(props) {

    const onDeleteTab = (tabId) => {
        props.delete(tabId);
    }

    const onTabClick = (tabId) => {
        props.activateBoard(tabId);
    }

    return (
        <div className='tab-wrapper'>
            { props.boards.map((board) => (
                    <TabItem 
                        key={board.id}
                        isActive={board.id === props.active.id} 
                        name={board.title} 
                        id={board.id} 
                        onTabClick={onTabClick} 
                        closeClicked={onDeleteTab} />
                ))
            }
            <IconButton onClick={props.onCreateBoard}><AddIcon></AddIcon></IconButton>
        </div>
    );
}