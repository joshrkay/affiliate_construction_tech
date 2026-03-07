# Memory System Task List (from transcript chapters)

Status: Drafted for execution
Date: 2026-03-06

## Core Tasks
- [ ] Define and document the real reason agent memory fails (team brief)
- [ ] Implement quick-start baseline: 3 highest-impact memory controls
- [ ] Document and train team on the 4 distinct memory types
- [ ] Audit for the 3 failure modes causing memory loss
- [ ] Decide and standardize compaction vs pruning policy
- [ ] Add verification step: prove loaded context with `/context list`
- [ ] Document what compaction does and does not preserve
- [ ] Enable Layer 1: pre-compaction memory flush workflow
- [ ] Enable Layer 2: manual saves + `/compact` operating trick
- [ ] Enable Layer 3: memory file architecture standards
- [ ] Add AGENTS.md memory protocol section (explicit instructions)
- [ ] Implement retrieval modes: Track A / A+ / QMD
- [ ] Add cost + cache monitoring for memory/retrieval operations
- [ ] Apply complete config baseline (copy-and-go checklist)
- [ ] Create “5 things to remember” team cheat sheet

## Suggested Owners
- Henry: orchestration + standards + rollout
- Spock: architecture policy (compaction/pruning, file architecture)
- Lisbeth: retrieval quality benchmarks (A/A+/QMD checks)
- Leslie: memory protocol documentation and training briefs
- Elliot: implementation wiring where needed
- Dexter: QA validation of memory persistence across restarts
- Marty: cost/cache reporting instrumentation

## Acceptance Criteria
- Team can restart and continue tasks without context loss
- Decisions from prior days are retrievable on-demand
- Memory behavior is predictable and testable
- Retrieval quality/cost is tracked and reviewable weekly
