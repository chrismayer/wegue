const { execSync } = require('child_process');
const copydir = require('copy-dir');

// keep add time and modify time
// keep file mode
// cover file when exists, default is true
copydir('app-starter', 'app', {
  utimes: true,
  mode: true,
  cover: false
}, function (err) {
  if (err) throw err;
  adaptReadme();
  console.log('done');
});

/**
 *
 */
function adaptReadme () {
  const fs = require('fs');
  const execSync = require('child_process').execSync;
  const readmeFile = 'app/README.md';
  fs.truncate(readmeFile, 0, function () {
    const template =
`
# Wegue App

This directory contains a Wegue based app.

* App created at: __CREATED_AT__
* Current Wegue commit: __WEGUE_COMMIT__
* Initial Wegue commit: __WEGUE_COMMIT__
* Prefix for app-specific commits: <place-your-commit-prefix-here-or-remove-line>
`;
    const now = new Date();
    let text = template.replace('__CREATED_AT__', now.toISOString());

    try {
      const gitCommand = 'git rev-parse HEAD';
      let commit = execSync(gitCommand).toString();
      commit = commit.trim()
      text = text.replaceAll('__WEGUE_COMMIT__', commit);
    } catch (error) {
      console.warn(`Could not retrieve git commit automatically -
        ensure you lace it yourself in the ${readmeFile}.`);
    }

    fs.writeFile(readmeFile, text, function (err) {
      if (err) return console.log(err);
      console.log('Hello World > helloworld.txt');
    });
  });
}
