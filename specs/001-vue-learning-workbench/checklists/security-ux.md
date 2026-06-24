# Security And Learning UX Requirements Checklist: Vue 数学母题学习工作台重构

**Purpose**: Validate the completeness, clarity, consistency, and measurability of authentication, user administration, and child-centered learning UX requirements before implementation.
**Created**: 2026-06-22
**Revalidated**: 2026-06-22 after clarification remediation
**Feature**: [spec.md](../spec.md)
**Audience**: PR reviewer
**Depth**: Standard pre-implementation gate

## Authentication Requirement Completeness

- [x] CHK001 Are protected and public routes exhaustively identified, including health checks and static assets? [Completeness, Spec §FR-028, §FR-042]
- [x] CHK002 Are the allowed operations during `mustChangePassword=true` explicitly limited and consistent across the spec and API contract? [Consistency, Spec §FR-030, §FR-038]
- [x] CHK003 Are requirements documented for invalid credentials, disabled accounts, pending accounts, expired accounts, and rate-limited attempts? [Coverage, Spec §User Story 1, Edge Cases]
- [x] CHK004 Is the no-public-registration boundary explicit for UI routes, API endpoints, and authentication-library defaults? [Completeness, Spec §FR-026]
- [x] CHK005 Are authentication error messages specified precisely enough to avoid username enumeration while remaining understandable? [Clarity, Spec §User Story 1.3, Edge Cases]
- [x] CHK006 Are password creation, temporary password, first-change, reset, and other-session revocation requirements all documented? [Completeness, Spec §FR-033, §FR-038]

## Session And Account Validity Clarity

- [x] CHK007 Are `validFrom`, `validUntil`, long-term validity, boundary equality, and UTC comparison semantics unambiguous? [Clarity, Spec §FR-030, §FR-031, Edge Cases]
- [x] CHK008 Is the distinction between account expiry and Session expiry explicitly defined? [Ambiguity, Spec §FR-031, §FR-035]
- [x] CHK009 Are absolute Session lifetime, idle timeout, and renewal behavior quantified? [Gap, Security]
- [x] CHK010 Are Session revocation triggers consistent for suspension, expiry, password reset, role change, and validity narrowing? [Consistency, Spec §FR-034, §FR-035]
- [x] CHK011 Is the maximum delay between an account becoming invalid and protected access being denied measurable? [Measurability, Spec §SC-010]
- [x] CHK012 Are requirements defined for multiple devices, concurrent Sessions, and Session rotation after authentication or privilege changes? [Coverage, Spec §Edge Cases, §FR-034]

## Authorization And Administration Consistency

- [x] CHK013 Are permissions for `admin` and `user` defined for every management and learning resource, not only at route level? [Completeness, Spec §FR-029, §FR-035]
- [x] CHK014 Is the operational process for creating additional administrators explicitly separated from the ordinary admin UI? [Clarity, Spec §Assumptions, Out Of Scope]
- [x] CHK015 Are immutable and editable user fields clearly distinguished, including username and internal authentication email? [Gap, Spec §FR-027, §FR-032]
- [x] CHK016 Are valid transitions between pending, active, expiring-soon, expired, and suspended states documented consistently? [Consistency, Spec §Key Entities, Data Model §Account Lifecycle]
- [x] CHK017 Are concurrent-edit conflict requirements complete for both detection and safe recovery? [Coverage, Spec §FR-041, Edge Cases]
- [x] CHK018 Are last-administrator protections consistent with the stated restriction that ordinary admins cannot create or promote admins? [Consistency, Spec §User Story 2.6, Out Of Scope]

## Audit, Privacy, And Recovery Requirements

- [x] CHK019 Are all security-sensitive administrative actions mapped to required audit events? [Completeness, Spec §FR-039]
- [x] CHK020 Are audit retention, access permissions, pagination, and deletion policy specified? [Gap, Security]
- [x] CHK021 Are sensitive values prohibited from API responses, logs, audit summaries, URLs, and browser storage consistently? [Consistency, Spec §FR-036, §FR-039]
- [x] CHK022 Are privacy requirements defined for IP address and user-agent data collected in Sessions or audit records? [Gap, Data Model §AuthSession]
- [x] CHK023 Are database backup, restore, and migration rollback expectations documented for account and audit data? [Gap, Reliability]
- [x] CHK024 Are requirements defined for partial failure when user data changes but Session revocation or audit writing fails? [Gap, Recovery]

## Learning UX Requirement Completeness

- [x] CHK025 Is the priority of problem theme and animation stage over filters and coach content expressed with measurable layout constraints? [Clarity, Spec §FR-003, §FR-004, UI/UX §Core Screen Anatomy]
- [x] CHK026 Are the required control categories for every interactive module complete and consistent: parameters, steps, hint, check, feedback, and reset? [Completeness, Spec §FR-009, §FR-014, §FR-015]
- [x] CHK027 Are requirements explicit that image objects and mathematical quantities share one state source rather than parallel visual representations? [Clarity, Spec §FR-011, §FR-013]
- [x] CHK028 Are integer-only requirements defined for generated parameters, intermediate values, answers, and invalid combinations? [Completeness, Spec §FR-012, Edge Cases]
- [x] CHK029 Are requirements for variant switching explicit about which navigation state is preserved and which animation state resets? [Clarity, Spec §FR-017, User Story 6]
- [x] CHK030 Are loading, empty, missing-asset, illegal-parameter, and module-load-failure requirements complete? [Coverage, Spec §FR-020, Edge Cases]

## Responsive And Accessibility Requirement Quality

- [x] CHK031 Are the desktop, tablet, and mobile filter surfaces and breakpoint behaviors specified consistently? [Consistency, Spec §FR-021, UI/UX §Tablet And Mobile Layout]
- [x] CHK032 Are minimum animation-stage dimensions and non-thumbnail expectations measurable at all target viewports? [Measurability, Spec §SC-002, UI/UX §Tablet And Mobile Layout]
- [x] CHK033 Are keyboard-equivalent requirements documented for drag, sliders, drawers, tabs, menus, and step controls? [Coverage, Spec §FR-022]
- [x] CHK034 Are focus entry, focus return, live-region, visible-focus, and reduced-motion requirements defined for both learning and admin surfaces? [Completeness, Spec §FR-022, UI/UX §Accessibility Requirements]
- [x] CHK035 Are accessible names specified for repeated icon controls and repeated admin row menus? [Clarity, UI/UX §Accessibility Requirements]
- [x] CHK036 Are text overflow, stable dimensions, and non-overlap requirements objectively measurable across the three target viewports? [Measurability, Spec §SC-002]

## Non-Functional Acceptance Quality

- [x] CHK037 Are latency targets defined separately for initial authentication, protected content loading, route structure display, and admin mutations? [Gap, Performance]
- [x] CHK038 Are login and sensitive-operation rate-limit thresholds quantified rather than delegated entirely to library defaults? [Gap, Security]
- [x] CHK039 Are availability, database recovery, and degraded-mode requirements intentionally excluded or documented? [Gap, Reliability]
- [x] CHK040 Are the five reference-module visual gates and all-module smoke gates traceable to explicit success criteria and tasks? [Traceability, Spec §SC-005, §SC-006]

## Notes

- Check items off only when the referenced requirements are sufficiently written, not when implementation is complete.
- Items marked `[Gap]` intentionally surface requirements that may need refinement before implementation.
