#!/bin/bash

set -e

HOST=yuca.yunity.org

echo "sending [public] to [$HOST]"

scp -r public deploy@$HOST:public
