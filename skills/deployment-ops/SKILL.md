---
name: deployment-ops
description: "GitHub Pages deployment troubleshooting playbook for the ISMAIL-IBRAHIM-ALHOSANI repo. Use when a Pages deployment gets stuck, times out, or the live site returns a 404, and to keep the repo backed up."
---

# Deployment Ops & Backup Playbook

## Site info
- Repo: serelldc/ISMAIL-IBRAHIM-ALHOSANI
- Live URL: https://serelldc.github.io/ISMAIL-IBRAHIM-ALHOSANI/
- Pages source: Deploy from a branch (main / root)

## Known issue: stuck / timing-out deployments
Symptom: new commits to main trigger a "pages build and deployment" Actions run.
The `build` job succeeds fast (~30s), but the `deploy` job either:
- stays "Queued" forever and blocks all future deploys, or
- runs ~10 minutes then fails with "Timeout reached, aborting!"

This can happen even on a totally unrelated commit, once one run gets stuck —
it locks the shared `github-pages` deployment environment for the whole repo.

### Fix order (fastest → most disruptive)
1. **Just retry** — push a trivial commit (e.g. edit a harmless HTML comment)
   to trigger a fresh run. Sometimes clears on its own.
2. **Re-run jobs** on the stuck run (Actions → run → "Re-run jobs"). Often
   stays stuck too if the environment lock is the real problem.
3. **Cancel run** via Actions list "..." menu. Frequently fails with
   "Failed to cancel workflow." — don't rely on this.
4. **Delete the github-pages Environment** (Settings → Environments → trash
   icon on "github-pages"). This clears the stuck lock. Requires GitHub
   "sudo mode" (email re-verification) — only the account owner
   (strategicresource.dc@gmail.com) can complete this step, an agent
   cannot do it on their behalf. After deletion, push a new commit to
   retrigger deployment.
   - Note: even after this, GitHub may still report "Timeout reached,
     aborting!" on the deploy job's status-check step, but the artifact
     can have deployed successfully anyway — always verify the live URL
     directly instead of trusting the red X alone.
5. **Do NOT unpublish the Pages site as a "fix"** — Settings → Pages →
   "Unpublish site" takes the live site down immediately (404 for
   visitors) and does not by itself resolve a stuck deployment. Re-enabling
   the source afterward does not guarantee the next deploy succeeds. Only
   use this if explicitly instructed.

### Always verify after any fix
1. Settings → Pages should show "Your site is live at ..." with a recent
   "Last deployed" timestamp.
2. Load https://serelldc.github.io/ISMAIL-IBRAHIM-ALHOSANI/ directly
   (not just the Actions run status) and confirm it renders, not a 404.
3. Spot-check the footer credit ("Developed and designed by [SRDC logo]")
   still renders and links to https://serelldc.github.io/.

## Backup strategy
Two layers, both automated:

1. **GitHub Release snapshots** — `.github/workflows/backup-release.yml`
   runs weekly (and can be triggered manually) and tags + publishes a
   dated GitHub Release. GitHub auto-attaches a source zip to every
   release, so each one is a restorable point-in-time copy, separate from
   whatever is currently on main.
   - To restore: download the "Source code (zip)" asset from any past
     release under the repo's Releases tab.
2. **Local zip export** — a Cowork scheduled task periodically downloads
   the full repo as a zip into the user's local outputs folder, so there's
   a copy outside of GitHub entirely (protects against account-level
   issues, not just code mistakes).

## Lessons learned (2026-08-06 incident)
- A stuck deployment run (#99) blocked ~5 subsequent deploys in a row
  across multiple failure modes (timeout, fast-cancel, stuck-queue on
  re-run of an old unrelated run too).
- Unpublishing Pages to try to "reset" it took the live site offline for
  the rest of the troubleshooting window — avoid this move.
- Environment deletion (with the user completing the email verification
  step) was the fix that ultimately cleared it, even though the very next
  run still showed a scary "Timeout reached, aborting!" — the deploy had
  actually gone through. Always confirm against the live URL, not just
  the Actions run's pass/fail badge.
