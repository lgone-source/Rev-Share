# MENA → KSA Entity: Merchant Contract Migration Plan

**Status:** Draft v1 · **Owner:** [confirm — Migration Lead, per Owners Figma] · **Last updated:** 2026-07-10

> Source of truth: post-call summary (below) + Owners Figma (RACI).
> ⚠️ Owner cells marked `[Figma]` are placeholders pending the Owners Figma — nothing in this plan should be actioned against a `[Figma]` owner until confirmed.

---

## 1. Objective

Migrate the existing merchant book currently contracted/invoiced through the **MENA entity** to the **KSA entity**, with the correct contractual, billing, tax, and e-invoicing posture for each merchant — without interrupting live processing.

## 2. Population & Scope

| Dimension | Count | Notes |
|---|---|---|
| Managed merchants | 154 | Have an account owner → comms driven 1:1 |
| Unmanaged merchants | 200 | **No account owner → needs a scaled comms track** |
| **Total in scope** | **354** | Cross-cut by the 3 contract categories below |

Two independent dimensions drive the plan:
- **Contract type** (No Contract / TPA Rev-Share Only / Direct Billing) → determines the *workflow*.
- **Management coverage** (Managed / Unmanaged) → determines *who runs comms and chases signature*.

> **First required action:** produce the 354-row master tracker mapping every merchant to *both* a contract category *and* managed/unmanaged, plus current MENA billing setup. This tracker is the backbone of the plan. Categories and counts below can only be trusted once the tracker reconciles to 354.

## 3. Contract Categories & Migration Workflow

### 3.1 No Contract
*Currently processing with Checkout without a formal agreement.*

**Path:** Unlock CKO KSA options in Salesforce → send the MAF (Merchant Application Form) → merchant completes → onboard to KSA.

**Hard gate:** ⚠️ Blocked until **email approval from Elaine, Remo, Nadia, and Tax**. Do not unlock KSA options in Salesforce before all four approvals are captured in writing.

| Step | Owner | Gate/Dependency |
|---|---|---|
| Secure written approval (Elaine, Remo, Nadia, Tax) | [Figma] | **Blocks everything below** |
| Unlock CKO KSA options in Salesforce | [Figma — Salesforce/SF admin] | After approval |
| Send MAF | Managed: account owner · Unmanaged: scaled track (§4) | After SF unlock |
| Collect + validate MAF | [Figma] | — |
| Finalize KSA onboarding | [Figma] | Standard approval process |

### 3.2 TPA Revenue-Share Only
*Merchants on a Third-Party-Provider rev-share model.*

**Path:** Thomas communicates with merchants → Config team makes backend changes → pilot testing to confirm stability → roll out.

| Step | Owner | Gate/Dependency |
|---|---|---|
| Merchant communication | **Thomas** | **Must precede backend changes** |
| Backend configuration changes | **Config team** | After Thomas' comms |
| Pilot testing (stability) | [Figma — Config/QA] | Before broad rollout |
| Phased rollout | [Figma] | After pilot sign-off |

**Sequencing rule:** No backend change until Thomas has told the affected merchant. Pilot on a small cohort before touching the full set.

### 3.3 Direct Billing (dual billing / rev-share)
*Merchants with dual billing + revenue-share structures.*

**Path:** **Case-by-case**, with a mandatory **tax review** per merchant.

| Step | Owner | Gate/Dependency |
|---|---|---|
| Per-merchant assessment | [Figma] | — |
| Tax review | **Tax** | **Blocks migration of that merchant** |
| Bespoke migration action | [Figma] | After tax sign-off |

**Sequencing rule:** Treat as the slowest, highest-risk lane. Do not batch. Each merchant clears tax before it moves.

## 4. Managed vs. Unmanaged Comms Tracks

- **Managed (154):** Account owner drives comms, MAF chase, and questions 1:1. Assign owners from the Figma; add a per-merchant status column to the tracker.
- **Unmanaged (200):** ⚠️ **Open gap — needs an explicit owner.** No account manager exists, so a scaled approach is required: templated mass email, self-serve MAF link, a shared inbox / support queue for questions, and an SLA-based chase cadence. **Decision needed:** who owns this queue, and what is the chase cadence (e.g., Day 0 send, Day 7 reminder, Day 14 escalation)?

## 5. New Merchants (in-flight)
Any *new* merchant requesting KSA-entity invoicing must still complete the **standard approval process** before onboarding is finalized — this migration does **not** create a fast-path. Flag in-flight new merchants so they are onboarded directly to KSA and never routed through MENA.

## 6. Cross-Cutting Workstream: E-Invoicing (KSA ZATCA)
KSA e-invoicing is a live dependency, not a side note. **Jelena joins the call tomorrow with Elaine** to understand the e-invoicing project rollout. Output needed from that call: does e-invoicing readiness gate any category's go-live, and what is the sequencing vs. the contract migration? Feed the answer back into §3 gates.

## 7. Phasing & Sequencing

| Phase | What | Exit criteria |
|---|---|---|
| **0 — Foundation** | Build 354-row master tracker; confirm owners from Figma; Jelena/Elaine e-invoicing readout | Tracker reconciles to 354; RACI confirmed; e-invoicing dependency understood |
| **1 — No Contract** | Secure 4-way approval → SF unlock → MAF waves (managed first, then unmanaged scaled track) | Approvals captured; MAFs issued; onboarding started |
| **2 — TPA Rev-Share** | Thomas comms → config changes → pilot → rollout | Pilot stable; rollout complete |
| **3 — Direct Billing** | Case-by-case with tax review each | All merchants tax-cleared and migrated |
| **4 — Close-out** | Confirm no residual MENA billing; reconcile; retire MENA setups | Zero live merchants billing via MENA in scope |

Phases 1–3 can run in parallel once Phase 0 is done; they gate on *different* owners (approvals vs. Thomas vs. Tax), so they don't block each other.

## 8. Risks & Open Questions ("the grill")
1. **Owners Figma not available** — RACI is provisional. Every `[Figma]` cell is a blocker.
2. **Unmanaged 200 have no comms owner** — biggest execution risk. Unassigned = MAFs never chased.
3. **Counts don't tie out** — 154 + 200 = 354, but the split *by contract category* is unknown. Need the tracker.
4. **No timeline/deadline given** — is there a regulatory or e-invoicing date forcing this? Sequencing depends on it.
5. **Approval gate is serial and multi-party** — Elaine, Remo, Nadia, Tax must all approve before *any* No-Contract merchant moves. Single slow approver stalls the whole lane.
6. **Direct Billing tax risk** — case-by-case + tax review makes this the long pole; may need its own sub-plan.
7. **Processing continuity** — plan must guarantee no gap in live processing during entity switch (esp. backend config changes in §3.2).

## 9. Source: Post-Call Summary
> Migration of merchants from the MENA entity to the KSA entity — 154 managed and 200 unmanaged.
> Categories: No Contract; TPA Revenue Share Only; Direct Billing (dual billing/rev-share).
> New merchants requesting KSA invoicing still go through standard approval before onboarding.
> Next steps — No Contract: unlock CKO KSA options in Salesforce, send MAF; subject to email approval from Elaine, Remo, Nadia, Tax. TPA Rev-Share: Config team backend changes + pilot testing, after Thomas communicates with merchants. Direct Billing: case-by-case, tax perspective. Jelena joins the call tomorrow with Elaine re: e-invoicing rollout.
