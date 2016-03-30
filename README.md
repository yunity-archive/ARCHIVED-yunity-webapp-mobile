[![Circle CI](https://circleci.com/gh/yunity/yunity-webapp-mobile.svg?style=shield)](https://circleci.com/gh/yunity/yunity-webapp-mobile)
[![David](https://david-dm.org/yunity/yunity-webapp-mobile.svg)](https://david-dm.org/yunity/yunity-webapp-mobile)

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

# Using Arch Linux, as root
pacman -S nodejs
```

## 2. install bower and a few other deps

```sh
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
