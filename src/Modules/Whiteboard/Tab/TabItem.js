import React from 'react';
import './TabItem.css';
import CloseIcon from '@material-ui/icons/Close';

export default function TabItem(props) {

    return (
        <div className={`tab-item ${props.isActive ? "active" : ""}`}
            onClick={() => props.onTabClick(props.id)}>
            <span className='tab-name'>{props.name}</span>
            <CloseIcon className="icon clickable" onClick={() => props.closeClicked(props.id)} />
        </div>
    )
};