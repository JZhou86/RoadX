import React from 'react';
import "../styles/uploader.css";

interface IUploaderNavProps {
    states: Array<string>;
    currentState: number;
    deviceId?: number;
    handleUploadStateChange: (stateNumber: number) => void;
}

interface IUploaderNavItemProps {
    stateName: string;
    stateNumber: number;
    isDisabled: boolean;
    isCurrent: boolean;
    handleUploadStateChange: () => void;
}

class NavItem extends React.Component<IUploaderNavItemProps, {}> {
    render() {
        if (this.props.isDisabled) {
            return (
                <div className="uploader__nav_item uploader__nav_item--disabled" >
                    {this.props.stateName}
                </div>
            )
        } else if (this.props.isCurrent) {
            return (
                <div 
                    className="uploader__nav_item uploader__nav_item--current"
                    onSelect={this.props.handleUploadStateChange}
                >
                    {this.props.stateName}
                </div>
            )
        } else {
            return (
                <div 
                    className="uploader__nav_item"
                    onSelect={this.props.handleUploadStateChange}
                >
                    {this.props.stateName}
                </div>
            )
        }
    }
}

export default class UploaderNav extends React.Component<IUploaderNavProps, {}> {
    renderFormattedNavStates() {
        let isDisabled: boolean = false
        let isCurrentState: boolean = false
        const formattedStates: JSX.Element[] = this.props.states.map((state, idx) => {
            if (idx === this.props.currentState) {
                isCurrentState = true;
            } else if (idx > this.props.currentState) {
                isDisabled = true;
            }
            return(
                <NavItem
                    key={idx}
                    stateName={state}
                    stateNumber={idx}
                    isCurrent={isCurrentState}
                    isDisabled={isDisabled}
                    handleUploadStateChange={() => this.props.handleUploadStateChange(idx)}
                />
            )
        })
        return formattedStates
    }

    renderUploadMetadata() {
        return (
            <div className="uploader__nav_metadata_section">
                <div className="uploader__nav_title"> RoadX </div>
                {
                    this.props.deviceId && 
                    <div className="uploader__nav_metadata_item"> 
                        Device Id: {this.props.deviceId} 
                    </div>
                }
            </div>
        )
    }

    render() {
        return (
            <div className="uploader__nav_contents">
                {this.renderUploadMetadata()}
                {this.renderFormattedNavStates()}
            </div>
        )
    }
}