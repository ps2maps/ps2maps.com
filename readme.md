## PlanetSide 2 Maps - ps2maps.com
Welcome to the repository for ps2maps.com. While this isn't the source for the entire history of the site (originating around September 2012), there is a lot here. I didn't do any legit source control for the site until mid 2014, which is where this repo picks up.

### Current Status (Aug 6, 2015)
This is where the code is now:

* PHP, Laravel 4.2.x
* MariaDB (MySQL is a fine alternative)
* Client JavaScript is all procedural (yuck!), generated from CoffeeScript via `gulp`
* CSS generated from SASS via `gulp`
* Map uses LeafletJS - A custom build from the 0.8-dev branch with custom support for pane and layer controls
* Other SVG support via RaphaelJS and SnapSVG
* Static contintent JSON files generated from database data

### Near Future Plans
There is so much I want to do to transform the site and make it more easy to maintain. Some plans

* Escape from PHP and move toward NodeJS Express 4.x. I have very little NodeJS experience but it is the clear direction to move
* No more procedural JavaScript
* Use something like Backbone for client-side models (Continents, Regions, Facilities, Lattice-Links, etc) in order to be more maintainable
* Be more dependent on Daybreak's Census API - For example, on the client side, pull the hex data from the API, calculate and draw the hex regions. This will make sure that the hex's are always matching what's in the API. Cache this data in localStorage or something along those lines
* Interactive multi-user live map drawing... this is a big one. Socket.io on the server side, on the client side, I need to develop a custom LeafletJS map drawing plugin (the existing ones are no where near good enough)
* Consider converting to a client-side single-page app. Not sure about this yet. Personally not sold on the whole Angular thing... ReactJS looks like better (and WAY faster) for custom web component support
* Might switch to MongoDB, but this isn't a database heavy site so it doesn't really matter much
* Integrate the latest LeafletJS 1.0 (beta), which has a ton of improvements and new features (including all the custom pane management features I contributed)
* Add all the marker icons back in (locations of spawn points, equipment terminals, teleporters, turrets, etc...). The best approach to this is to be stored in `.json` files in the repo that anyone can fork, alter and create a PR for. This will make it very maintainable and easily allow any non-developers to help keep these up to date
* Need to alter the Leaflet map to use a custom CRS that matches the PlanetSide 2 CRS instead of the Simple CRS with scaled values. This way, using `/loc` in game will actually match to locations on the map. This feature is in progress

### Contributing Guide

* To develop, you'll need PHP 5.4.x, MariaDB (or MySQL 5.x would work fine too), GulpJS
* Create a `.env.local.php` with your database credentials (See the example, as well as Laravel 4.2 docs on this)
* Make sure you `# composer install` the Laravel dependencies
* Use Laravel's `artisan` to run the migrations
* I'm afraid I don't have any seeds for the current state of the database. I'll need to commit a SQL dump soon for this
* `# npm install` your NodeJS dependencies
* run `# gulp` at the command line to watch all SASS, CoffeeScript, etc files
