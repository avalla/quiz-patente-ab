import React from 'react';
import PropTypes from 'prop-types';
import { Select } from '@chakra-ui/react';
import argomenti from '../services/chapters.json';
import { MOCK_TEST_VALUE } from '../constants/mock-test';
import { getChapterLabel, getMockTestLabel } from '../i18n/chapters';

function ArgomentoPicker({ value, onChange, includeMockOption }) {
    const selectValue = value ?? '';
    return (
        <Select
            value={selectValue}
            placeholder='Select topic'
            onChange={(event) => onChange(event.target.value)}
        >
            {includeMockOption && (
                <option value={MOCK_TEST_VALUE}>{getMockTestLabel()}</option>
            )}
            {argomenti.map(argomento => (
                <option
                    key={argomento.id_chapter}
                    value={argomento.id_chapter}
                >
                    {getChapterLabel(argomento)}
                </option>
            ))}
        </Select>
    );
}

ArgomentoPicker.defaultProps = {
    value: null,
    includeMockOption: false,
};
ArgomentoPicker.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    includeMockOption: PropTypes.bool,
};
export default ArgomentoPicker;
