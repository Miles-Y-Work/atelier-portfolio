#!/usr/bin/env bash
set -euo pipefail
exec "$(dirname "${BASH_SOURCE[0]}")/hugo.sh" server --bind 127.0.0.1 --port 1313 "$@"
