const reqs = pm.globals.get('require');
const pkgs = pm.globals.get('packages');
const installed = pm.globals.get('installedPackages');
let helpers = [];

if (pkgs && (reqs === installed)) {
  postman.setEnvironmentVariable("helpers", pkgs);
} else {
  const req = reqs.split(',')

  for (let i = 0; i < req.length; i++) {
    pm.sendRequest({
      async: false,
      url: `https://raw.githubusercontent.com/marten-cz/postman-libraries/main/${req[i]}.js`,
      method: 'GET'
    }, (err, res) => {
      if (!err) {
        helpers.push(`${req[i]}: ${res.text()}`);
        pm.globals.set('installedPackages', pm.globals.get('installedPackages', reqs));
        pm.globals.set('packages', `() => { return { ${helpers.join(', ')} }; }`);

        postman.setEnvironmentVariable("helpers", pm.globals.get('packages'));
      }
    });
  }
}
