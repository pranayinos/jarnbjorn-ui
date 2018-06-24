import React from 'react';

export default class FormSeperator extends React.Component {
    render() {
        const seperator = {
            border: '1px solid',
            borderColor: 'lightgrey #f1f3f6 lightgray #f1f3f6',
            display: 'block',
            marginLeft: '-20px',
            marginRight: '-20px',
            marginTop: '0px',
            marginBottom: '20px',
            height: '40px',
            padding: '10px 5px 10px 25px',
            color: '#788195',
            backgroundColor: '#f1f3f6',
            fontSize: '14px'
        };
        return (
            <div style={seperator} >
                <span>{this.props.title}</span>
            </div>
        );
    }
}
