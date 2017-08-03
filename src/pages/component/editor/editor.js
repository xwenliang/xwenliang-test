import React from 'react';
import ReactDOM from 'react-dom';
import SimpleMDE from '../../../vendor/simplemde/simplemde.min';
import Prism from '../../../vendor/prismjs/prism';
import '../../../css/font/font-awesome.min.css';
import '../../../vendor/simplemde/simplemde.min.css';
import '../../../vendor/prismjs/prism.css';
import './editor.less';

/* https://github.com/NextStepWebs/simplemde-markdown-editor
 * @props: 
 *      editorConfig: {
 *          placeholder: 'some editor config'
 *      }
 * @methods: 
 *      setValue(val)   : set value of editor
 *      getValue        : return value of editor content
 *      getHtml(val)    : return html of editor content
 */

let editorConfig = {
    editorId: 'zoo-editor',
    autofocus: true,
    autosave: {
        enabled: true,
        delay: 1000,
        uniqueId: 'someID'
    },
    blockStyles: {
        bold: "__",
        italic: "_"
    },
    indentWithTabs: false,
    insertTexts: {
        horizontalRule: ["", "\n\n-----\n\n"],
        image: ["![](http://", ")"],
        link: ["[", "](http://)"],
        table: ["", "\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text      | Text     |\n\n"],
    },
    lineWrapping: true,
    parsingConfig: {
        allowAtxHeaderWithoutSpace: false,
        strikethrough: false,
        underscoresBreakWords: false,
    },
    placeholder: "Type here...",
    previewRender: function(plainText, preview) { // Async method
        setTimeout(function(){
            preview.innerHTML = this.parent.markdown(plainText);
            Prism.highlightAll();
        }.bind(this), 0);
        //return "Loading...";
    },
    promptURLs: false,
    renderingConfig: {
        singleLineBreaks: false,
        codeSyntaxHighlighting: true,
    },
    shortcuts: {
        drawTable: "Cmd-Alt-T"
    },
    spellChecker: false,
    // Optional usage
    status: ["autosave", "lines", "words"/*, "cursor", {
        // Another optional usage, with a custom status bar item that counts keystrokes
        className: "keystrokes",
        defaultValue: function(el) {
            this.keystrokes = 0;
            el.innerHTML = "0 Keystrokes";
        },
        onUpdate: function(el) {
            el.innerHTML = ++this.keystrokes + " Keystrokes";
        }
    }*/],
    styleSelectedText: false,
    toolbarTips: false,
    tabSize: 4,
    // set toolbar will cause some bugs(https://github.com/sparksuite/simplemde-markdown-editor/issues/91)
    // set hide instead
    // toolbar: ["bold", "italic", "heading", "|", "side-by-side"],
    // toolbar: [
    //     {
    //         name: 'side-by-side',
    //         action: SimpleMDE.toggleSideBySide,
    //         className: 'fa fa-columns no-disable no-mobile',
    //         title: 'Side by Side'
    //     }
    // ],
    hideIcons: [
        // 'bold',
        // 'italic',
        // 'heading',
        // 'code',
        // 'quote',
        // 'unordered-list',
        // 'ordered-list',
        'guide'
    ]
};


export default class Editor extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ...props
        };
        this.editorConfig = {
            ...editorConfig,
            ...props.editorConfig
        };
    }
    componentWillReceiveProps(props){
        this.setState({
            ...props
        });
    }
    render(){
        return (
            <div>
                <textarea
                    id={this.editorConfig.editorId}
                ></textarea>
            </div>
        );
    }
    componentDidMount(){
        this.editorConfig.element = document.getElementById(this.editorConfig.editorId),
        this.simplemde = new SimpleMDE(this.editorConfig);
    }
    setValue(val){
        this.simplemde.value(val);
    }
    getValue(){
        return this.simplemde.value();
    }
    getHtml(val){
        return this.simplemde.markdown(val);
    }
};

