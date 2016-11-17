CKEDITOR.stylesSet.add('text', [
    {name: 'Title (h2)', element: 'h2'},
    {name: 'Subtitle (h3)', element: 'h3'},
    {name: 'Subtitle (h4)', element: 'h4'},
    {name: 'Text', element: 'p'},
    {name: 'Inline blue text', element: 'strong', attributes: {"class": "blue"}},
    {name: 'Code', element: 'code'},
    {name: 'Formated text', element: 'pre'}
]);

CKEDITOR.editorConfig = function (config) {
    config.siteKey = (typeof contextJsParameters != 'undefined') ? contextJsParameters.siteKey : '';
    config.workspace = (typeof contextJsParameters != 'undefined') ? contextJsParameters.workspace : '';

    config.contentsCss = [((typeof contextJsParameters != 'undefined') ? contextJsParameters.contextPath : '') + '/modules/bootstrap3-core/css/bootstrap.min.css', ((typeof contextJsParameters != 'undefined') ? contextJsParameters.contextPath : '') + '/modules/highlightjs/css/foundation.css', ((typeof contextJsParameters != 'undefined') ? contextJsParameters.contextPath : '') + '/modules/highlightjs/css/clipboard.css', ((typeof contextJsParameters != 'undefined') ? contextJsParameters.contextPath : '') + '/modules/jahia-academy-template/css/academy.css'];
    config.templates_files = [((typeof contextJsParameters != 'undefined') ? contextJsParameters.contextPath : '') + '/modules/jahia-academy-template/javascript/academy/ck/cktemplates.js'];

    config.stylesSet = 'text';

    config.justifyClasses = ['text-left', 'text-center', 'text-right', 'text-justify'];
    config.templates_replaceContent = false;

    config.toolbar_Tiny = [
        ['Source', '-', 'Templates', 'PasteText', 'wsc', 'Scayt', 'ACheck', 'Styles'],
        ['Bold', 'Italic'],
        ['NumberedList', 'BulletedList', 'Outdent', 'Indent', 'Blockquote'],
        ['JustifyLeft', 'JustifyCenter', 'JustifyRight'],
        ['Link', 'Unlink', 'Anchor', 'Image'],
        ['RemoveFormat', 'HorizontalRule', 'ShowBlocks', 'CodeSnippet']
    ];
    config.extraPlugins = 'acheck,wsc,scayt,macrosdropdown,codesnippet';
    config.codeSnippet_theme = 'googlecode';
    config.codeSnippet_languages = {
        javascript: 'JavaScript',
        php: 'PHP',
        java: 'Java',
        xml: 'XML',
        html: 'HTML'
    };

};
CKEDITOR.config.toolbar = 'Tiny';

CKEDITOR.dtd.$removeEmpty['i'] = 0;
CKEDITOR.dtd.$removeEmpty['span'] = 0;