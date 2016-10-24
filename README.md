# GitHubble 
[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

### Status: test repo
### Note: don't create PRs or issues right now. We are working on it locally, at present.

website: [http://githubble.xyz](http://githubble.xyz)


## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku Toolbelt](https://toolbelt.heroku.com/) installed (for heroku deployment).

```sh
$ git clone git@github.com:forksociety/githubble.git # or clone your own fork
$ cd githubble
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```
