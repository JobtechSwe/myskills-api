module.exports = {
  linters: {
    '*.ts': [
      'prettier --write',
      'eslint --fix',
      'git add',
      'npm run unit -- --bail --findRelatedTests',
    ],
  },
}
