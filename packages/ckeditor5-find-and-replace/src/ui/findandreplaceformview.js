
import { ButtonView, LabeledFieldView, createLabeledInputText, View, submitHandler } from 'ckeditor5/src/ui';

export default class FindAndReplaceFormView extends View {
	constructor( locale ) {
		super( locale );

		// this.findAndReplacePlugin = plugins.get( 'FindAndReplace' );

		const t = locale.t;

		/**
		 * The Find Previous button view.
		 */
		this.findPrevView = this._createButton( t( '<' ), 'ck-button-prev', 'submit' );

		/**
		 * The Find Next button view.
		 */
		this.findNextButtonView = this._createButton( t( '>' ), 'ck-button-next', 'submit' );
		this.findNextButtonView.on( 'execute', () => {
			this.fire( 'findNext', { searchText: this.searchText } );
		} );

		/**
		 * The Replace One button view.
		 */
		this.replaceOneView = this._createButton( t( '?' ), 'ck-button-prev', 'submit' );

		/**
		 * The Replace All button view.
		 */
		this.replaceAllView = this._createButton( t( 'REPLACE' ), 'ck-button-next', 'submit' );

		/**
		 * The Find input view.
		 */
		this.findInputView = this._createInputField( 'Find', 'Search for something you\'d like to find' );

		/**
		 * The Replace input view.
		 */
		this.replaceInputView = this._createInputField( 'Replace', 'Replace what you\'ve previously selected' );

		/**
		 * Find view config
		 */
		this.findViewConfig = this._createFindView( this.findNextButtonView, this.findPrevView, this.findInputView );

		/**
		 * Replace view config
		 */
		this.replaceViewConfig = this._createReplaceView( this.replaceAllView, this.replaceOneView, this.replaceInputView );
	}

	render() {
		super.render();

		submitHandler( {
			view: this
		} );

		this._createToolbarDropdown();
	}

	/**
	 * Find view configuration
	 *
	 * @private
	 * @return {module:ui/view~View} The find view instance.
	 */
	_createFindView( NextInputView, PrevInputView, InputView ) {
		const findView = new View();

		// PrevInputView.on( 'execute', () => {
		// 	console.log( 'prevButton has been clicked' );
		// } );
		findView.setTemplate( {
			tag: 'form',
			attributes: {
				class: [
					'ck',
					'ck-media-form',
					'ck-responsive-form'
				],
				tabindex: '-1'
			},
			children: [
				InputView,
				PrevInputView,
				NextInputView
			]
		} );

		return findView;
	}

	/**
	 * Replace view configuration
	 *
	 * @private
	 * @returns {module:ui/view~View} The replace view instance.
	 */
	_createReplaceView( NextInputView, PrevInputView, InputView ) {
		const replaceView = new View();

		// NextInputView.on( 'execute', () => {
		// 	this.findAndReplacePlugin.replaceAll( 'testingReplace' );
		// 	this.findAndReplacePlugin.stop();
		// } );

		replaceView.setTemplate( {
			tag: 'form',
			attributes: {
				class: [
					'ck',
					'ck-media-form',
					'ck-responsive-form'
				],
				tabindex: '-1'
			},
			children: [
				InputView,
				PrevInputView,
				NextInputView
			]
		} );
		return replaceView;
	}

	/**
	 * Creates a labeled input view.
	 *
	 * @private
	 * @param {String} labelText The input label.
	 * @param {String} infoText The additional information text.
	 * @returns {module:ui/labeledfield/labeledfieldview~LabeledFieldView} Labeled input view instance.
	 */
	_createInputField( label, infoText ) {
		const labeledInput = new LabeledFieldView( this.locale, createLabeledInputText );
		const inputView = labeledInput.fieldView;

		inputView.on( 'input', () => {
			this.searchText = inputView.element.value;
		} );

		labeledInput.label = label;
		labeledInput.infoText = infoText;
		labeledInput.render();

		return labeledInput.element;
	}

	/**
	 * Creates a button view.
	 *
	 * @private
	 * @param {String} label The button label.
	 * @param {String} icon The button icon.
	 * @param {String} className The additional button CSS class name.
	 * @returns {module:ui/button/buttonview~ButtonView} The button view instance.
	 */
	_createButton( label, icon, className ) {
		const button = new ButtonView( this.locale );

		button.set( {
			label,
			withText: true,
			tooltip: true
		} );

		button.extendTemplate( {
			attributes: {
				class: className
			}
		} );

		return button;
	}
}