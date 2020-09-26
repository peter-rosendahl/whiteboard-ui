import React, {Component} from 'react';
import './TabItem.css';
import CloseIcon from '@material-ui/icons/Close';

class TabItem extends Component {

    
    render() {
        return (
            <div className={`tab-item ${this.props.isActive ? "active" : ""}`}
                onClick={() => this.props.onTabClick(this.props.id)}>
                <span className='tab-name'>{this.props.name}</span>
                <CloseIcon className="icon clickable" onClick={() => this.props.closeClicked(this.props.id)} />
            </div>
        )
    }
}

export default TabItem;