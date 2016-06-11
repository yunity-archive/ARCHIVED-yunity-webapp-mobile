#!/bin/bash

set -e

HOST=yuca.yunity.org

echo "sending [public] to [$HOST]"

rsync -av --delete public deploy@$HOST:public
