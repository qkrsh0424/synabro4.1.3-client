import React from "react";
import { EditorState, RichUtils, AtomicBlockUtils } from "draft-js";

export const MediaBlockRenderer = block => {
	if (block.getType() === "atomic") {
		return {
			component: Media,
			editable: false,
		};
	}

	return null;
};

export const MediaBlockRendererReadOnly = (block,props) => {
	if (block.getType() === "atomic") {
		return {
			component: Media,
			editable: false
		};
	}

	if(block && block.getType() === "unstyled" && block.getEntityAt(0)){
		return{
			strategy: linkStrategy,
			component: Link
		};
	}

	return null;
};

const Image = props => {
	if (!!props.src) {
		return (
			<img src={props.src} />
		);
	}
	return null;
};

const Media = props => {
	const entity = props.contentState.getEntity(props.block.getEntityAt(0));
	const { src } = entity.getData();
	const type = entity.getType();

	let media;

	if (type === "image" || type=== "IMAGE") {
		media = <Image src={src} />;
	}

	return media;
};

const linkStrategy = (contentBlock, callback, contentState) => {
	contentBlock.findEntityRanges(character => {
		const entityKey = character.getEntity();
		return (
			entityKey !== null &&
			contentState.getEntity(entityKey).getType() === "LINK"
		);
	}, callback);
};

const Link = props => {
	const entity = props.contentState.getEntity(props.block.getEntityAt(0));
	// console.log(entity);
	const { url } = entity.getData();
	// console.log(props.block);
	const type = entity.getType();
	const text = props.block.text;

	if (type === "link" || type=== "LINK") {
		return (
			<a
				className="link"
				href={`http://${url}`}
				rel="noopener noreferrer"
				target="_blank"
				aria-label={url}
			>
				{text}
			</a>
		);
	}

	
	
};
