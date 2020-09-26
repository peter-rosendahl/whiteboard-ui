import './Tab.css';
import React, { Component } from 'react';
import TabItem from './TabItem';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';

class TabOverview extends Component {

    onDeleteTab = (tabId) => {
        this.props.delete(tabId);
    }

    onTabClick = (tabId) => {
        this.props.activateBoard(tabId);
    }

    render() {
        return (
            <div className='tab-wrapper'>
                { this.props.boards.map((board) => (
                        <TabItem 
                            key={board.id}
                            isActive={board.id === this.props.active.id} 
                            name={board.title} 
                            id={board.id} 
                            onTabClick={this.onTabClick} 
                            closeClicked={this.onDeleteTab} />
                    ))
                }
                <IconButton onClick={this.props.onCreateBoard}><AddIcon></AddIcon></IconButton>
            </div>
        );
    }
}

export default TabOverview;