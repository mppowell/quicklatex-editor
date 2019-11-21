/**
 * BLOCK: quicklatex-editor
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const {PlainText} = wp.blockEditor;
const {RawHTML} = wp.element; // Needed to make shortcodes work properly

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/block-quicklatex-editor', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'quicklatex-editor - CGB Block' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'quicklatex-editor — CGB Block' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ),
	],
	attributes: {
		content: {type: 'string'},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	edit: ( props ) => {
		// Creates a <p class='wp-block-cgb-block-ascii-tree'></p>.
		function updateContent(eventContent){
			props.setAttributes({content: eventContent});
		}

		// Handle keypress and intercept tabs
		function handleKeypress(event){
		//event.target.style.cssText = "height:" + event.target.scrollHeight + "px";
			if(event.keyCode==9 || event.which==9) {
				event.preventDefault();
				let s = event.target.selectionStart;
				event.target.value = event.target.value.substring(0,s) + "    " + event.target.value.substring(s);
				event.target.selectionEnd = s+4;
			} 
		}

		return (	
			<PlainText
				onChange={updateContent}
				onKeyDown={handleKeypress}
				className={ props.className }
				placeholder="Type Latex here"
				keepPlaceholderOnFocus={true}
				value={props.attributes.content}
				/>		
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ( props ) => {
		return (
			<div className={ props.className }>
				<div>[latex]
				{props.attributes.content}				
				[/latex]</div>
			</div>
		);
	},
} );
