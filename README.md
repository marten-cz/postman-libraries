# Postman Helpers

## 1. Setup in Postman
Create a global variable in Postman called `require`. Provide a comma separated listed of packages you need e.g. `graphql`.
It will load all the files from this repository which are in the list.

Add the following script (install.js) to the `Pre-Request Script` of your collection:

```js
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

```

## 2. How to use

Evalute content of helpers variable. The methods are accessible under <filename>().<method>().

```js
let helpers = eval(environment.helpers)();
console.log(helpers.graphql().isGraphql());
```
