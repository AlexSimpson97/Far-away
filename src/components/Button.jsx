

import PropTypes from 'prop-types';

export default function Button({ btnText, type = '', handleClick }) {
    return (
        <button onClick={handleClick} className={`btn ${type}`}>
            {btnText}
        </button>
    );
}

Button.propTypes = {
    btnText: PropTypes.string.isRequired,
    type: PropTypes.string,
    handleClick: PropTypes.func,
};

