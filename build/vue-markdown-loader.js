const path = require('path');
const fs = require('fs');
const hljs = require('highlight.js');
const markdownIt = require('markdown-it');
const markdownItContainer = require('markdown-it-container');

function _renderHighlight(str, lang) {
    if (!(lang && hljs.getLanguage(lang))) {
        return '';
    }
    return `<pre class="hljs"><code>${
        hljs.highlight(lang, str, true).value
    }</code></pre>`;
}

function setLabelRender(label) {
    return function(tokens, idx) {
        const m = tokens[idx].info.trim().match(`^${label}\\s+(.*)$`) || [];
        if (tokens[idx].nesting === 1) {
            return m[1] ?
                `<div class="page-docs__${label}">\n` +
                        `<div class="page-docs__${label}-title">${m[1]}</div>` :
                `<div class="page-docs__${label}">\n`;
        } else {
            return '</div>\n';
        }
    };
}

function getMarkdownOptions () {
    const md = markdownIt({
        highlight: _renderHighlight
    });
    return {
        raw: true,
        highlight: _renderHighlight,
        use: [
            [markdownItContainer, 'tip', {
                render: setLabelRender('tip')
            }],
            [markdownItContainer, 'warning', {
                render: setLabelRender('warning')
            }],
            [markdownItContainer, 'danger', {
                render: setLabelRender('danger')
            }],
            [markdownItContainer, 'demo', {
                validate: function(params) {
                    return params.trim().match(/^demo\s*(.*)$/);
                },
                render: function(tokens, idx) {
                    const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);

                    if (tokens[idx].nesting === 1) {
                        const params = (m && m.length > 1) ? m[1] : '';
                        const pathSplits = params.split(' ');
                        const desc = tokens[idx + 2].content;
                        const module = pathSplits[0];
                        const component = pathSplits[1];
                        let file;
                        if (module) {
                            if (module === 'packages' && component) {
                                file = path.resolve(__dirname, '../examples/views/packages', `${component}.vue`);
                            }
                            if (component) {
                                file = path.resolve(__dirname, '../examples/views/components', module, `${component}.vue`);
                            } else {
                                file = path.resolve(__dirname, '../examples/views/components', module, `${module}.vue`);
                            }
                        }

                        let html = '';
                        if (file && fs.existsSync(file)) {
                            if (component === 'icon') {
                                html = '';
                            } else {
                                html = `\`\`\`html\n${fs.readFileSync(file, 'utf8')}\`\`\`\n`;
                            }
                        } else {
                            html = '';
                        }
                        const desHtml = md.render(html);
                        // 移除描述，防止被添加到代码块
                        tokens[idx + 2].children = [];
                        return `<demo-block>
                        <template #desc>
                            ${md.renderInline(desc)}
                        </template>
                        <template #source>
                           ${desHtml}`;
                    }
                    return '</template></demo-block>\n';
                }
            }]
        ]
    };
}

module.exports = {
    getMarkdownOptions
};
