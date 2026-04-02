/** @type {import('@commitlint/types').UserConfig} */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Allow capital letters in the commit subject
    'subject-case': [0],
  },
}
