# yunity-webapp-mobile

## 1. install node.js and bower for package management

```sh
$ sudo apt-get install nodejs fswebcam
$ sudo npm install -g bower
```

## 2. bower has sometimes this link issue

```sh
$ ln -s /usr/bin/nodejs /usr/bin/node
```

## 3. install dependecies

```sh
bower install
```

## 4. very important install webhook for push webcam picture

```sh
chmod +x scripts/picture-fswebcam
ln -sr scripts/picture-fswebcam .git/hooks/pre-push
```
