# MENA → KSA Entity: Merchant Contract Migration Plan

**Status:** Draft v2 · **Project Owners:** Jelena & Alaa · **Last updated:** 2026-07-10

> Driven by a **regulatory KSA e-invoicing (ZATCA) deadline** — this is a hard forcing function. `[confirm exact date]`
> ⚠️ **No rollback:** once a merchant is live on the KSA entity, it cannot be reverted. Pre-go-live validation is the only safety net — every merchant must pass a go-live check before cutover.

---

## 1. Objective

Migrate the existing merchant book contracted/invoiced through the **MENA entity** to the **KSA entity**, with the correct contractual, billing, tax, and e-invoicing posture for each merchant — without interrupting live processing and with zero reliance on rollback.

## 2. Owners (RACI)

| Role | Owner | Scope |
|---|---|---|
| Project Owners | **Jelena & Alaa** | Overall delivery, sequencing, escalation |
| Contract Owner | **Lencer** | MAF issuance, contract execution, No-Contract lane |
| Invoices Owner | **Seema** | Billing/invoicing entity switch, invoice setup |
| Legal Owner | **Nadia** | Legal review; one of the 4 No-Contract approvers |
| Merchant Comms Owner | **Thomas** | All merchant communications (managed + unmanaged) |
| CAT Owner | **Davine** | Salesforce KSA unlock, backend config, pilot testing |
| Unmanaged comms delivery | **Merchant Care** (with Thomas) | Scaled comms for the 200 unmanaged |
| No-Contract approvals | **Elaine, Remo, Nadia, Tax** | Written approval gate |

## 3. Population & Scope

| Segment | Count | Comms track |
|---|---|---|
| Managed | 154 | Account owner drives 1:1 comms + MAF chase |
| Unmanaged | 200 | Thomas + **Merchant Care**: scaled comms, self-serve MAF, chase SLA |
| **Total** | **354** | — |

Segmentation for execution is **managed vs. unmanaged**. Contract category (below) determines the *workflow* each merchant follows.

> **Phase 0 action:** master tracker of all 354, each row tagged with contract category + managed/unmanaged + current MENA billing setup + go-live-check status. Reconcile to 354.

## 4. Contract Categories & Migration Workflow

### 4.1 No Contract
*Processing with Checkout without a formal agreement.*

**Path:** Approval gate → Davine unlocks CKO KSA options in Salesforce → Lencer sends MAF → collect/validate → onboard to KSA.

**Hard gate:** ⚠️ Blocked until **written email approval from Elaine, Remo, Nadia, and Tax**. No Salesforce unlock before all four are captured.

| Step | Owner | Gate/Dependency |
|---|---|---|
| Secure written approval (Elaine, Remo, Nadia, Tax) | Jelena & Alaa (drive) | **Blocks everything below** |
| Unlock CKO KSA options in Salesforce | **Davine** | After approval |
| Send MAF | **Lencer** (managed via account owners; unmanaged via Thomas + Merchant Care) | After SF unlock |
| Collect + validate MAF | **Lencer** | — |
| Invoicing entity switch | **Seema** | Before go-live |
| Pre-go-live check + finalize onboarding | **Davine** / account owner | Standard approval process; **must pass go-live check (no rollback)** |

### 4.2 TPA Revenue-Share Only
*Merchants on a Third-Party-Provider rev-share model.*

**Path:** Thomas communicates with merchants → Davine/CAT makes backend changes → pilot testing → rollout.

| Step | Owner | Gate/Dependency |
|---|---|---|
| Merchant communication | **Thomas** | **Must precede backend changes** |
| Backend configuration changes | **Davine (CAT)** | After Thomas' comms |
| Pilot testing (stability) | **Davine (CAT)** | **Mandatory — no rollback if it fails live** |
| Phased rollout | **Davine (CAT)** | After pilot sign-off |

**Sequencing rule:** No backend change until Thomas has told the merchant. Because there's no rollback, pilot must prove stability before any production cutover.

### 4.3 Direct Billing (dual billing + rev-share only)
*Confirmed scope: merchants with a dual billing + revenue-share structure.*

**Path:** **Case-by-case**, with mandatory **tax review** per merchant.

| Step | Owner | Gate/Dependency |
|---|---|---|
| Per-merchant assessment | **Lencer** + Jelena/Alaa | — |
| Tax review | **Tax** | **Blocks migration of that merchant** |
| Contract + invoicing action | **Lencer** / **Seema** | After tax sign-off |
| Pre-go-live check + cutover | **Davine** | Must pass go-live check (no rollback) |

**Sequencing rule:** Slowest, highest-risk lane. Do not batch. Each merchant clears tax and the go-live check before cutover.

## 5. Unmanaged Comms Track (200)
Owned by **Thomas with Merchant Care**. No account managers, so:
- Templated mass email + self-serve MAF link.
- Merchant Care shared queue for questions.
- Chase cadence with an SLA (e.g., Day 0 send · Day 7 reminder · Day 14 escalation to Thomas/Project Owners). `[confirm cadence]`

## 6. New Merchants (in-flight)
Any *new* merchant requesting KSA-entity invoicing still completes the **standard approval process** before onboarding — no fast-path. Flag in-flight new merchants for direct-to-KSA onboarding; never route through MENA.

## 7. E-Invoicing (KSA ZATCA)
The **regulatory e-invoicing deadline is the forcing function** for this migration. Per current call, e-invoicing readiness is **not treated as a per-category go-live gate for now** — tracked in parallel by Jelena. Revisit if the ZATCA date compresses the timeline.

## 8. Phasing & Sequencing

| Phase | What | Exit criteria |
|---|---|---|
| **0 — Foundation** | 354-row master tracker; RACI live (done); confirm ZATCA date | Tracker reconciles to 354; deadline fixed |
| **1 — No Contract** | 4-way approval → SF unlock → MAF waves (managed first, then unmanaged via Merchant Care) → go-live checks | Approvals captured; MAFs in; merchants passing go-live check |
| **2 — TPA Rev-Share** | Thomas comms → Davine config → pilot → rollout | Pilot stable; rollout complete |
| **3 — Direct Billing** | Case-by-case, tax-gated, go-live-checked | All tax-cleared and migrated |
| **4 — Close-out** | Confirm zero residual MENA billing; reconcile; retire MENA setups | No in-scope merchant billing via MENA |

Phases 1–3 run in parallel after Phase 0 — they gate on different owners (approvals vs. Thomas vs. Tax).

## 9. Risks & Open Questions
1. **Exact ZATCA/e-invoicing deadline still needed** — sequencing and wave sizing depend on it. Only remaining Phase-0 blocker.
2. **No rollback = pre-go-live check is critical** — a bad cutover cannot be undone; the go-live checklist must be enforced per merchant.
3. **Unmanaged 200 chase relies on Merchant Care capacity** — confirm they can absorb 200 + the chase SLA.
4. **Approval gate is serial + multi-party** — one slow approver (Elaine/Remo/Nadia/Tax) stalls the whole No-Contract lane.
5. **Direct Billing tax lane is the long pole** — case-by-case + tax review; may need its own sub-plan and buffer against the deadline.
6. **Processing continuity during backend config (§4.2)** — no gap in live processing during entity switch.

## 10. Source: Post-Call Summary
> MENA → KSA migration — 154 managed, 200 unmanaged. Categories: No Contract; TPA Revenue Share Only; Direct Billing (dual billing + rev-share). New merchants still go through standard approval. No Contract: unlock CKO KSA options in Salesforce, send MAF; subject to email approval from Elaine, Remo, Nadia, Tax. TPA Rev-Share: config team backend changes + pilot, after Thomas communicates. Direct Billing: case-by-case, tax perspective. Jelena joins the call with Elaine re: e-invoicing rollout. Regulatory e-invoicing deadline is the forcing function; no rollback once live.
