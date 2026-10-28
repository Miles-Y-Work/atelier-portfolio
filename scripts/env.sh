# 在项目目录运行：source scripts/env.sh
ATELIER_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
export PATH="$ATELIER_ROOT/.tools:$PATH"
ATELIER_RUNTIME="${XDG_CACHE_HOME:-$HOME/.cache}/codex-runtimes/codex-primary-runtime/dependencies"
if [[ -d "$ATELIER_RUNTIME/node/bin" ]]; then
  export PATH="$ATELIER_RUNTIME/node/bin:$ATELIER_RUNTIME/bin/fallback:$PATH"
fi
unset ATELIER_ROOT ATELIER_RUNTIME
