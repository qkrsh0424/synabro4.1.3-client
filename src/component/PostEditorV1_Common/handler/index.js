import React from 'react';

function findLinkEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                contentState.getEntity(entityKey).getType() === 'LINK'
            );
        },
        callback
    );
}

const Link = (props) => {
    const { url } = props.contentState.getEntity(props.entityKey).getData();
    return (
        <a href={url}>
            {props.children}
        </a>
    );
};

function findImageEntities(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                contentState.getEntity(entityKey).getType() === 'IMAGE'
            );
        },
        callback
    );
}

const Image = (props) => {
    const {
        height,
        src,
        width,
    } = props.contentState.getEntity(props.entityKey).getData();

    return (
        <img src={src} height={height} width={width} />
    );
};

const myBlockStyleFn = (contentBlock) =>{
    const type = contentBlock.getType();

    switch(type){
        case 'text-left-draft' :
            return 'text-left-draft';
            break;
        case 'text-right-draft':
            return 'text-right-draft';
            break;
        case 'text-center-draft':
            return 'text-center-draft';
            break;
        case 'text-justify-draft':
            return 'text-justify-draft';
            break;
    }
  }

export { findLinkEntities, findImageEntities, Link, Image, myBlockStyleFn };