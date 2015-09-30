# yunity-webapp-mobile

## 1. install a recent nodejs

We are mostly using >v4 but 0.12.x probably works ok too. You can install via https://github.com/nodesource/distributions:

```sh
# Using Ubuntu
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y nodejs

# Using Debian, as root
curl -sL https://deb.nodesource.com/setup_4.x | bash -
apt-get install -y nodejs
```

## 2. install bower and a few other deps

```sh
$ sudo apt-get install fswebcam
$ sudo npm install -g bower
```

## 3. you might have to do this

```sh
$ ln -s /usr/bin/nodejs /usr/bin/node
```

## 4. install app dependecies

```sh
bower install
npm install
```

## 5. npm link yunity-webapp-common

This means you can develop this locally without having to push to github for each change. It symlinks the library to the global node_modules, then symlinks from there to the app project.

```sh
cd ../yunity-webapp-common
sudo npm link
cd ../yunity-webapp-webapp
npm link yunity-webapp-common
```

(note: you might have to chown `yunity-webapp-common/node_modules` back to yourself after this)

## 6. very important install webhook for push webcam picture

```sh
chmod +x scripts/picture-fswebcam
ln -sr scripts/picture-fswebcam .git/hooks/pre-push
```
