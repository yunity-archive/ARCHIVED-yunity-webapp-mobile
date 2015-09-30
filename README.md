# yunity-webapp-mobile

## 1. install node.js and bower for package management

```sh
$ sudo apt-get install nodejs node fswebcam imagemagick graphicsmagick
$ sudo npm install -g bower
$ sudo npm install -g cordova
$ sudo npm install -g cordova-media-generator
```

## 2. bower has sometimes this link issue

```sh
$ ln -s /usr/bin/nodejs /usr/bin/node
```

## 3. install dependecies

```sh
bower install
npm install
```

## 4. npm link yunity-webapp-common

This means you can develop this locally without having to push to github for each change. It symlinks the library to the global node_modules, then symlinks from there to the app project.

```sh
cd ../yunity-webapp-common
sudo npm link
cd ../yunity-webapp-webapp
npm link yunity-webapp-common
```

(note: you might have to chown `yunity-webapp-common/node_modules` back to yourself after this)

## 5. very important install webhook for push webcam picture

```sh
chmod +x scripts/picture-fswebcam
ln -sr scripts/picture-fswebcam .git/hooks/pre-push
```
