#!/usr/bin/env bash
set -euo pipefail
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"
export HUGO_CACHEDIR="${HUGO_CACHEDIR:-$PROJECT_ROOT/.tools/hugo-cache}"
if [[ -x "$PROJECT_ROOT/.tools/hugo" ]]; then
  exec "$PROJECT_ROOT/.tools/hugo" "$@"
elif command -v hugo >/dev/null 2>&1; then
  exec hugo "$@"
else
  echo "未找到 Hugo。请安装 Hugo Extended 0.168.0，或将其放到 .tools/hugo。" >&2
  exit 1
fi
