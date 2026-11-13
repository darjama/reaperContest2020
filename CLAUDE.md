# Delegation to opencode

Claude Code acts as orchestrator; opencode supplies worker agents.

- For well-scoped, independent implementation tasks, dispatch to `opencode-worker` subagents (see `.claude/agents/opencode-worker.md`). Run them in parallel only when their files don't overlap.
- Worker prompts must be self-contained: file paths, constraints, and acceptance criteria. Workers have no conversation context.
- Each worker uses its own git worktree/branch (`opencode/<slug>`). Review every diff and run tests yourself before merging.
- Keep planning, cross-cutting changes, and final review in the orchestrator.
