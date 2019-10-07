import React from 'react';
import BoldIcon from '@material-ui/icons/FormatBold';
import ItalicIcon from '@material-ui/icons/FormatItalic';
import UnderLineIcon from '@material-ui/icons/FormatUnderlined';

const inlineStyles = [
    {
        label: "bold",
        style: "BOLD",
        icon: <BoldIcon />
    },
    {
        label: "italic",
        style: "ITALIC",
        icon: <ItalicIcon />
    },
    {
        label: "underline",
        style: "UNDERLINE",
        icon: <UnderLineIcon />
    },
];

export { inlineStyles };