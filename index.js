// const schema = require('./lib/schema.js');

module.exports = {
  extend: '@apostrophecms/widget-type',
  options: {
    label: 'Link'
  },
  fields: {
    add: {
      // 👇 The first column area
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
      custom: {
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
  }
};
