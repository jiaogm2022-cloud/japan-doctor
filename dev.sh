#!/bin/bash
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
cd /Users/animart/japan-doctor
exec node node_modules/.bin/next dev --webpack
