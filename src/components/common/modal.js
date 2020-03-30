import * as React from "react";

const modalContainerStyle = {
    zIndex: 10,
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const modalStyle = {
    backgroundColor: 'white',
    width: '90vw',
    height: '80vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
};

const modalContentStyle = {};

class Modal extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {shown, modalContent, modalFooter} = this.props;

        if (shown) {
            return (
                <div style={modalContainerStyle}>
                    <div className={'z-depth-1 container'} style={modalStyle}>
                        <div style={modalContentStyle}>
                            {modalContent}
                        </div>
                        {modalFooter}
                    </div>
                </div>
            )
        }

        return null;
    }

}

export {Modal}
