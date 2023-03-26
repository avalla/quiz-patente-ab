import React from 'react';
import PropTypes from 'prop-types';
import {Select} from "@chakra-ui/react"
import argomenti from '../services/chapters.json';

function ArgomentoPicker({value, onChange}) {
    return (
        <Select
            value={value}
            placeholder="Seleziona argomento"
            onChange={event => onChange(event.target.value)}
        >
            {argomenti.map(argomento => (
                <option
                    key={argomento.id_chapter}
                    value={argomento.id_chapter}
                >
                    {argomento.id_chapter}. {argomento.descrizione}
                </option>
            ))}
        </Select>
    );
}

ArgomentoPicker.defaultProps = {
    value: null
};
ArgomentoPicker.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.number,
};
export default ArgomentoPicker;
