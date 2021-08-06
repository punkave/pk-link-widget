module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    alias: 'link',
    label: 'Link'
  },
  fields: {
    add: {
      linkText: {
        label: 'Link Text',
        type: 'string',
        required: true
      },
      linkType: {
        label: 'Link Type',
        type: 'select',
        required: true,
        choices: [
          {
            label: 'Page',
            value: 'page'
          },
          {
            label: 'File',
            value: 'file'
          },
          {
            label: 'Custom',
            value: 'custom'
          }
        ]
      },
      _linkPage: {
        label: 'Link Page',
        type: 'relationship',
        withType: '@apostrophecms/any-page-type',
        required: true,
        max: 1,
        builders: {
          project: {
            title: 1,
            _url: 1
          }
        },
        if: {
          linkType: 'page'
        }
      },
      _linkFile: {
        label: 'Link File',
        type: 'relationship',
        withType: '@apostrophecms/file',
        required: true,
        max: 1,
        builders: {
          project: {
            title: 1,
            _url: 1
          }
        },
        if: {
          linkType: 'file'
        }
      },
      customUrl: {
        label: 'Custom URL',
        type: 'url',
        required: true,
        if: {
          linkType: 'custom'
        }
      },
      linkTarget: {
        label: 'Will the link open a new browser tab?',
        type: 'boolean'
      }
    }
  },
  helpers (self) {
    return {
      linkPath (link) {
        if (!link) {
          return;
        }
        let path;
        if (link.linkType === 'page' && link._linkPage && link._linkPage[0]) {
          path = link._linkPage[0]._url;
        } else if (link.linkType === 'file' && link._linkFile && link._linkFile[0]) {
          path = link._linkFile[0]._url;
        } else if (link.linkType === 'custom') {
          path = link.customUrl;
        }
        return path;
      }
    };
  }
};
