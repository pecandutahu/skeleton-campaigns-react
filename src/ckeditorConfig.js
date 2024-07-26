// CkeditorConfig.js
import {
    ClassicEditor,
    AccessibilityHelp,
    Autoformat,
    AutoLink,
    Autosave,
    Bold,
    Code,
    CodeBlock,
    Essentials,
    GeneralHtmlSupport,
    Heading,
    HtmlComment,
    HtmlEmbed,
    Italic,
    Link,
    Paragraph,
    SelectAll,
    ShowBlocks,
    SourceEditing,
    Table,
    TableCaption,
    TableCellProperties,
    TableColumnResize,
    TableProperties,
    TableToolbar,
    TextTransformation,
    Undo
  } from 'ckeditor5';
  
  const editorConfig = {
    toolbar: {
      items: [
        'undo', 'redo', '|', 'sourceEditing', 'showBlocks', 'selectAll', '|',
        'heading', '|', 'bold', 'italic', 'code', '|', 'link', 'insertTable',
        'codeBlock', 'htmlEmbed', '|', 'accessibilityHelp'
      ],
      shouldNotGroupWhenFull: false
    },
    plugins: [
      AccessibilityHelp, Autoformat, AutoLink, Autosave, Bold, Code, CodeBlock,
      Essentials, GeneralHtmlSupport, Heading, HtmlComment, HtmlEmbed, Italic,
      Link, Paragraph, SelectAll, ShowBlocks, SourceEditing, Table, TableCaption,
      TableCellProperties, TableColumnResize, TableProperties, TableToolbar,
      TextTransformation, Undo
    ],
    heading: {
      options: [
        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
        { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
        { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
        { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
      ]
    },
    htmlSupport: {
      allow: [{ name: /^.*$/, styles: true, attributes: true, classes: true }]
    },
    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: 'https://',
      decorators: {
        toggleDownloadable: { mode: 'manual', label: 'Downloadable', attributes: { download: 'file' } }
      }
    },
    placeholder: 'Type or paste your content here!',
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
    }
  };
  
  export { ClassicEditor, editorConfig };
  