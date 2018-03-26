# snMVC
snMVC is Simple Nodejs MVC template.

### Why ?
I was not able to find a simple MVC to begin with Nodejs. So I try to create a simple one but also a little bit configurable.

This template use express and EJS (EJS can be easily change).

### Directories

- config :
  - config.dev.js => config for dev environement
  - config.dev.js => config for prod environement
  - router.js => all routes for express
- controllers => all your logic
- middlewares => all your middlewares
- models => all your models
  - entities => all your class to map your data in the databases
- public => all static stuff
- vendors => I don't know how to call this directory, but here is where your put "external stuff"
- views => all your view to be render
  - partials => part of views

Easy to use/understand/modify/improve.

### How to use it ?

Just launch

```
npm install
npm start
```

Just check [this example](https://github.com/Inglebard/snMVC-example) to understand how it works.
