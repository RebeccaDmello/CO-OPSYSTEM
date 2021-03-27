import React, { Component } from 'react'

export class Footer extends Component {
    render() {
        const footer = { 
            position: 'fixed',
            left: '0',
            bottom: '0',
            width: '100%',
            color: 'white',
            textAlign: 'center',
            fontSize: 'smaller'
        }
        return (
            <div className="footer-copyright text-center py-3 bg-dark" style={footer}>
                <cite>&copy; 2021: Rebecca Moses Dmello</cite>
            </div>
        )
    }
}

export default Footer;