import { useState } from "react";

// --- Icon components ---
const ChevronDown = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
);
const CheckIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
);
const XIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);
const EditIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>
);
const ListIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="3" cy="6" r="1" fill="currentColor"/><circle cx="3" cy="12" r="1" fill="currentColor"/><circle cx="3" cy="18" r="1" fill="currentColor"/></svg>
);
const RefreshIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>
);
const CommentIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
);

// --- Comment Bubble (document margin) ---
const CommentBubble = ({ isActive, onClick, isAI }) => (
  <div
    onClick={onClick}
    style={{
      position: "absolute", right: -20, width: 24, height: 24,
      background: isAI ? "#7c3aed" : isActive ? "#2563eb" : "#e5e7eb",
      borderRadius: 4, cursor: "pointer",
      display: "flex", alignItems: "center", justifyContent: "center",
      transition: "background 0.2s", zIndex: 2,
    }}
  >
    <CommentIcon size={13} />
  </div>
);

// --- Comment Card (floats next to document) ---
const CommentCard = ({ comment }) => (
  <div style={{
    background: "#fff", border: comment.isAI ? "1.5px solid #c4b5fd" : "1px solid #e5e7eb", borderRadius: 8,
    padding: "10px 12px", width: 260, boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    fontSize: 12,
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
      <div style={{
        width: 24, height: 24, borderRadius: "50%",
        background: comment.isAI ? "#7c3aed" : "#2563eb",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff", fontSize: comment.isAI ? 8 : 10, fontWeight: 700,
      }}>
        {comment.isAI ? "nd" : comment.initials}
      </div>
      <div>
        <div style={{ fontWeight: 600, color: "#111827", fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}>
          {comment.author}
          {comment.isAI && (
            <span style={{
              fontSize: 9, padding: "1px 5px", borderRadius: 6,
              background: "#f3e8ff", color: "#7c3aed", fontWeight: 600,
            }}>AI</span>
          )}
        </div>
        <div style={{ color: "#9ca3af", fontSize: 10 }}>{comment.date}</div>
      </div>
      <span style={{ marginLeft: "auto", color: "#9ca3af", cursor: "pointer", fontSize: 14 }}>···</span>
    </div>
    <div style={{ color: "#374151", lineHeight: 1.5 }}>{comment.text}</div>
    {comment.evidence && (
      <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 6 }}>
        {comment.evidence.map((ev, i) => (
          <span key={i} style={{
            display: "inline-flex", alignItems: "center", gap: 3,
            fontSize: 10, padding: "2px 6px", borderRadius: 8,
            background: ev.type === "clause-library" ? "#f0fdf4" : ev.type === "comment" ? "#eff6ff" : "#faf5ff",
            color: ev.type === "clause-library" ? "#15803d" : ev.type === "comment" ? "#1d4ed8" : "#7e22ce",
          }}>
            {ev.label}
          </span>
        ))}
      </div>
    )}
    <div style={{
      marginTop: 8, padding: "6px 8px", background: "#f9fafb", borderRadius: 4,
      border: "1px solid #f3f4f6", color: "#9ca3af", fontSize: 11,
    }}>
      Reply
    </div>
  </div>
);

// --- Toggle Switch ---
const Toggle = ({ label, checked, onChange }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <div
      onClick={onChange}
      style={{
        width: 36, height: 20, borderRadius: 10, cursor: "pointer",
        background: checked ? "#2563eb" : "#d1d5db", position: "relative",
        transition: "background 0.2s",
      }}
    >
      <div style={{
        width: 16, height: 16, borderRadius: "50%", background: "#fff",
        position: "absolute", top: 2,
        left: checked ? 18 : 2, transition: "left 0.2s",
        boxShadow: "0 1px 2px rgba(0,0,0,0.15)",
      }} />
    </div>
    <span style={{ fontSize: 12, color: "#374151" }}>{label}</span>
  </div>
);

// --- Mock Data ---
const EDITS = [
  {
    id: "term-1",
    section: "Term and Termination",
    page: 1,
    sectionLabel: "Term and Termination",
    before: "Either party may terminate for material breach not cured within 30 days after written notice.",
    after: "Either party may terminate for material breach not cured within 30 days after written notice. In the event of termination for cause, the non-breaching party shall be entitled to recover reasonable damages.",
    aiComment: {
      text: "Added a damages recovery clause to protect the non-breaching party upon termination for cause. Language modeled after ND Clause Library entry 'Termination for Cause \u2014 Remedies' (v2.1), adapted to match the agreement's existing defined terms. This addresses J. Smith's comment requesting a damages provision.",
      evidence: [
        { type: "comment", label: 'Responding to: J. Smith' },
        { type: "clause-library", label: "ND Clause Library: Termination" },
      ],
    },
  },
  {
    id: "term-2",
    section: "Term and Termination",
    page: 1,
    sectionLabel: "Term and Termination",
    before: "Client may terminate for convenience on 15 days written notice.",
    after: "Client may terminate for convenience on 30 days' written notice.",
    aiComment: {
      text: "Extended the convenience termination notice from 15 to 30 days. A 15-day window is below the 25th percentile for service agreements exceeding $40K in annual value. Consider whether the Client prefers the shorter window.",
      evidence: [
        { type: "benchmark", label: "Industry benchmark: 30-day min" },
      ],
    },
  },
  {
    id: "fees-1",
    section: "Fees and Payment",
    page: 2,
    sectionLabel: "Fees and Payment",
    before: "Late amounts may accrue interest at 1.0 percent per month or the maximum allowed by law, whichever is less.",
    after: "Late amounts shall accrue interest at 1.5 percent per month or the maximum allowed by law, whichever is less, beginning 10 days after the invoice due date.",
    aiComment: {
      text: "Strengthened the late-payment provision: changed 'may' to 'shall' for enforceability, increased rate to 1.5% (market standard for B2B service agreements), and added a 10-day grace period to reduce disputes. Addresses K. Friedland's comment requesting tighter language.",
      evidence: [
        { type: "comment", label: "Responding to: K. Friedland" },
        { type: "clause-library", label: "ND Clause Library: Late Payment" },
        { type: "benchmark", label: "Market rate: 1.5% standard" },
      ],
    },
  },
  {
    id: "ip-1",
    section: "Intellectual Property",
    page: 2,
    sectionLabel: "Intellectual Property",
    before: "Provider retains ownership of such pre-existing materials and",
    after: "Provider retains ownership of such pre-existing materials and grants Client a perpetual, non-exclusive, royalty-free license to use pre-existing materials solely as embedded in the Deliverables, and",
    aiComment: {
      text: "Added an explicit license-back for pre-existing materials embedded in deliverables. Without this, Client owns the deliverables but could lack rights to use Provider's underlying IP within them. Language based on ND Clause Library 'IP License-Back \u2014 Service Agreement' pattern. Addresses J. McElroy's comment flagging the ambiguity.",
      evidence: [
        { type: "comment", label: "Responding to: J. McElroy" },
        { type: "clause-library", label: "ND Clause Library: IP License-Back" },
      ],
    },
  },
];

// Group edits by section
const SECTIONS = [
  { title: "Term and Termination", edits: EDITS.filter((e) => e.section === "Term and Termination") },
  { title: "Fees and Payment", edits: EDITS.filter((e) => e.section === "Fees and Payment") },
  { title: "Intellectual Property", edits: EDITS.filter((e) => e.section === "Intellectual Property") },
];

// Pre-existing human comments
const HUMAN_COMMENTS = [
  { id: "human-term", anchorId: "term-1", initials: "JS", author: "J. Smith", date: "3/15/26 2:30 PM", text: "Add damages clause \u2014 we need remedies paired with termination rights per our standard playbook.", isAI: false },
  { id: "human-fees", anchorId: "fees-1", initials: "KF", author: "K. Friedland", date: "3/15/26 3:15 PM", text: "Tighten late fees \u2014 1% is below market and 'may accrue' is too soft. Make it mandatory.", isAI: false },
  { id: "human-ip", anchorId: "ip-1", initials: "JM", author: "Javontay McElroy", date: "3/16/26 1:10 PM", text: "Clarify IP license \u2014 the transfer-of-rights clause needs to explicitly state that the receiving party's license is limited, non-exclusive, and revocable.", isAI: false },
];

// --- Suggestion Card (no reasoning drawer) ---
const SuggestionCard = ({ edit, onApply, onIgnore, appliedState, onHighlight }) => {
  if (appliedState) {
    return (
      <div style={{
        padding: "10px 12px", background: appliedState === "applied" ? "#f0fdf4" : "#f9fafb",
        borderRadius: 8, marginBottom: 8, fontSize: 12,
        color: appliedState === "applied" ? "#16a34a" : "#9ca3af",
        display: "flex", alignItems: "center", gap: 6,
      }}>
        {appliedState === "applied" ? <CheckIcon size={13} /> : <XIcon size={13} />}
        {appliedState === "applied" ? (
          <span>Edit applied <span style={{ color: "#6b7280", fontWeight: 400 }}>\u2014 comment added to document</span></span>
        ) : "Edit ignored"}
      </div>
    );
  }

  return (
    <div
      onMouseEnter={() => onHighlight && onHighlight(edit.id)}
      onMouseLeave={() => onHighlight && onHighlight(null)}
      style={{
        background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8,
        padding: "10px 12px", marginBottom: 8,
        boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
        <RefreshIcon size={13} />
        <span style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>Replace</span>
        <span style={{ fontSize: 11, color: "#9ca3af", marginLeft: "auto" }}>p. {edit.page}</span>
      </div>

      <div style={{ fontSize: 12, lineHeight: 1.6, color: "#1f2937", marginBottom: 8 }}>
        <span style={{ fontWeight: 600, color: "#111827" }}>{edit.sectionLabel}. </span>
        {edit.before && (
          <span style={{ background: "#fecaca", textDecoration: "line-through", color: "#991b1b", padding: "0 2px", borderRadius: 2 }}>
            {edit.before}
          </span>
        )}
        {edit.before && " "}
        <span style={{ background: "#bbf7d0", color: "#166534", padding: "0 2px", borderRadius: 2 }}>
          {edit.after}
        </span>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
        <button
          onClick={() => onApply(edit.id)}
          style={{
            display: "flex", alignItems: "center", gap: 4, padding: "5px 12px",
            fontSize: 12, border: "1px solid #d1d5db", borderRadius: 6,
            background: "#fff", cursor: "pointer", color: "#374151",
          }}
        >
          <CheckIcon /> Apply
        </button>
        <button
          onClick={() => onIgnore(edit.id)}
          style={{
            display: "flex", alignItems: "center", gap: 4, padding: "5px 12px",
            fontSize: 12, border: "1px solid #d1d5db", borderRadius: 6,
            background: "#fff", cursor: "pointer", color: "#374151",
          }}
        >
          <XIcon /> Ignore
        </button>
      </div>
    </div>
  );
};

// --- Section Group ---
const SectionGroup = ({ section, editStates, onApply, onIgnore, onHighlight }) => (
  <div style={{ marginBottom: 16 }}>
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      marginBottom: 8, padding: "0 2px",
    }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{section.title}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{
          fontSize: 11, padding: "1px 8px", borderRadius: 10,
          background: "#eff6ff", color: "#2563eb", fontWeight: 500,
        }}>
          {section.edits.length} {section.edits.length === 1 ? "edit" : "edits"}
        </span>
        <EditIcon size={13} />
        <ListIcon size={13} />
      </div>
    </div>
    {section.edits.map((edit) => (
      <SuggestionCard
        key={edit.id}
        edit={edit}
        appliedState={editStates[edit.id]}
        onApply={onApply}
        onIgnore={onIgnore}
        onHighlight={onHighlight}
      />
    ))}
  </div>
);

// --- Word Ribbon Toolbar ---
const RibbonToolbar = () => {
  const tabs = ["Home", "Insert", "Draw", "Design", "Layout", "References", "Mailings", "Review", "View"];
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <div style={{ background: "#fff", borderBottom: "1px solid #d1d5db" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 0, padding: "0 8px",
        borderBottom: "1px solid #e5e7eb", background: "#f9fafb",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 2, padding: "4px 8px 0" }}>
          <span style={{ fontSize: 11, color: "#6b7280", cursor: "pointer", padding: "4px 6px" }}>File</span>
        </div>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "6px 10px", fontSize: 11, border: "none", cursor: "pointer",
              background: activeTab === tab ? "#fff" : "transparent",
              color: activeTab === tab ? "#111827" : "#6b7280",
              fontWeight: activeTab === tab ? 600 : 400,
              borderBottom: activeTab === tab ? "2px solid #2563eb" : "2px solid transparent",
              marginBottom: -1,
            }}
          >
            {tab}
          </button>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4, padding: "4px 8px" }}>
          {["Editor", "Copilot"].map((label) => (
            <div key={label} style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 1,
              padding: "2px 6px", cursor: "pointer",
            }}>
              <div style={{
                width: 20, height: 20, background: "#e5e7eb", borderRadius: 4,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 9, color: "#6b7280",
              }}>{label[0]}</div>
              <span style={{ fontSize: 9, color: "#6b7280" }}>{label}</span>
            </div>
          ))}
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 1,
            padding: "2px 6px", cursor: "pointer",
          }}>
            <div style={{
              width: 20, height: 20, background: "#1e3a5f", borderRadius: 4,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", fontSize: 8, fontWeight: 700,
            }}>nd</div>
            <span style={{ fontSize: 9, color: "#1e3a5f", fontWeight: 600 }}>NetDocs</span>
          </div>
        </div>
      </div>

      <div style={{
        display: "flex", alignItems: "center", gap: 12, padding: "6px 12px",
        fontSize: 11, color: "#6b7280",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ padding: "2px 4px", cursor: "pointer" }}>Paste</span>
          <span style={{ color: "#d1d5db" }}>|</span>
        </div>
        <select style={{ fontSize: 11, border: "1px solid #d1d5db", borderRadius: 3, padding: "2px 4px", color: "#374151" }}>
          <option>Times New R...</option>
        </select>
        <select style={{ fontSize: 11, border: "1px solid #d1d5db", borderRadius: 3, padding: "2px 4px", color: "#374151", width: 40 }}>
          <option>10</option>
        </select>
        <div style={{ display: "flex", gap: 2 }}>
          {["B", "I", "U"].map((f) => (
            <span key={f} style={{
              padding: "1px 5px", cursor: "pointer", fontWeight: f === "B" ? 700 : 400,
              fontStyle: f === "I" ? "italic" : "normal",
              textDecoration: f === "U" ? "underline" : "none",
            }}>{f}</span>
          ))}
        </div>
        <span style={{ color: "#d1d5db" }}>|</span>
        <div style={{ display: "flex", gap: 6 }}>
          {["Normal", "No Spacing", "Heading 1", "Heading 2", "Title"].map((s) => (
            <span key={s} style={{
              padding: "2px 6px", border: "1px solid #e5e7eb", borderRadius: 2,
              fontSize: 10, cursor: "pointer", whiteSpace: "nowrap",
            }}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Mock Word Document ---
const MockDocument = ({ activeComment, setActiveComment, highlightedEdit, aiComments }) => {
  // Merge human comments with AI comments
  const allComments = [...HUMAN_COMMENTS, ...aiComments];

  // Comment positions in the doc (approximate top offsets for each anchor)
  const commentPositions = {
    "term-1": 230,
    "term-2": 330,
    "fees-1": 620,
    "ip-1": 730,
  };

  // Find the active comment object
  const activeCommentObj = allComments.find((c) => c.id === activeComment);

  // Figure out which anchor the active comment belongs to, to position it
  const activeAnchor = activeCommentObj?.anchorId || activeComment;

  return (
    <div style={{
      flex: 1, background: "#e8e8e8", overflow: "auto", padding: "30px 40px",
      display: "flex", justifyContent: "center",
    }}>
      <div style={{ position: "relative", maxWidth: 680 }}>
        {/* Paper */}
        <div style={{
          background: "#fff", boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
          padding: "60px 72px", minHeight: 900, fontFamily: "'Times New Roman', serif",
          fontSize: 13, lineHeight: 1.8, color: "#1f2937", position: "relative",
        }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, textAlign: "center", marginBottom: 4, fontFamily: "'Times New Roman', serif" }}>
            MASTER SERVICES AGREEMENT
          </h1>
          <p style={{ textAlign: "center", fontSize: 12, color: "#6b7280", marginBottom: 24 }}>
            Effective Date: March 1, 2026
          </p>

          <p style={{ marginBottom: 16 }}>
            This Master Services Agreement ("Agreement") is entered into by and between <strong>Acme Corp.</strong> ("Client")
            and <strong>Vertex Solutions LLC</strong> ("Provider"), collectively referred to as the "Parties."
          </p>

          <p style={{ fontWeight: 700, marginBottom: 8 }}>1. Scope of Services</p>
          <p style={{ marginBottom: 16 }}>
            Provider agrees to perform the professional services described in one or more Statements of Work
            ("SOW") executed by the Parties during the term of this Agreement. Each SOW shall reference this
            Agreement and describe the specific deliverables, timelines, and fees applicable to the engagement.
          </p>

          {/* Section 2 - Term and Termination */}
          <p style={{ fontWeight: 700, marginBottom: 8 }}>2. Term and Termination</p>
          <div style={{ position: "relative", marginBottom: 8 }}>
            <p>
              <span style={{ marginRight: 8 }}>a.</span>
              <span
                style={{
                  background: highlightedEdit === "term-1" ? "#dbeafe" : "transparent",
                  borderLeft: highlightedEdit === "term-1" ? "3px solid #2563eb" : "3px solid transparent",
                  paddingLeft: 4, transition: "all 0.2s",
                }}
              >
                Either party may terminate for material breach not cured within 30 days after written notice.
                {" "}<span style={{ background: "#bbf7d0", color: "#166534", padding: "0 2px", borderRadius: 2 }}>
                  In the event of termination for cause, the non-breaching party shall be entitled to recover reasonable damages.
                </span>
              </span>
            </p>
            {/* Show all comment bubbles for this anchor */}
            {allComments.filter((c) => c.anchorId === "term-1").map((c, i) => (
              <div key={c.id} style={{ position: "absolute", right: -20 - (i * 28), top: 0 }}>
                <div
                  onClick={() => setActiveComment(activeComment === c.id ? null : c.id)}
                  style={{
                    width: 24, height: 24,
                    background: c.isAI ? "#7c3aed" : activeComment === c.id ? "#2563eb" : "#e5e7eb",
                    borderRadius: 4, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background 0.2s",
                  }}
                >
                  <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke={c.isAI || activeComment === c.id ? "#fff" : "#6b7280"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>
          <div style={{ position: "relative", marginBottom: 16 }}>
            <p>
              <span style={{ marginRight: 8 }}>b.</span>
              <span
                style={{
                  background: highlightedEdit === "term-2" ? "#dbeafe" : "transparent",
                  borderLeft: highlightedEdit === "term-2" ? "3px solid #2563eb" : "3px solid transparent",
                  paddingLeft: 4, transition: "all 0.2s",
                }}
              >
                Client may terminate for convenience on{" "}
                <span style={{ background: "#fecaca", textDecoration: "line-through", color: "#991b1b" }}>15 days</span>{" "}
                <span style={{ background: "#bbf7d0", color: "#166534", padding: "0 2px", borderRadius: 2 }}>30 days'</span>{" "}
                written notice.
              </span>
            </p>
            {allComments.filter((c) => c.anchorId === "term-2").map((c, i) => (
              <div key={c.id} style={{ position: "absolute", right: -20 - (i * 28), top: 0 }}>
                <div
                  onClick={() => setActiveComment(activeComment === c.id ? null : c.id)}
                  style={{
                    width: 24, height: 24,
                    background: c.isAI ? "#7c3aed" : activeComment === c.id ? "#2563eb" : "#e5e7eb",
                    borderRadius: 4, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke={c.isAI || activeComment === c.id ? "#fff" : "#6b7280"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>

          <p style={{ fontWeight: 700, marginBottom: 8 }}>3. Obligations of the Receiving Party</p>
          <p style={{ marginBottom: 16 }}>
            The Receiving Party shall not use or disclose Confidential Information for any purpose other than
            the Purpose specified, and shall take all necessary precautions to prevent any unauthorized use or
            disclosure.
          </p>

          <p style={{ fontWeight: 700, marginBottom: 8 }}>4. Permitted Disclosures</p>
          <p style={{ marginBottom: 16 }}>
            The Receiving Party may disclose Confidential Information to its affiliates, employees, contractors,
            or third-party consultants so long as they are bound by a similar confidentiality agreement.
          </p>

          {/* Section 5 - Fees */}
          <p style={{ fontWeight: 700, marginBottom: 8 }}>5. Fees and Payment</p>
          <p style={{ marginBottom: 8 }}>
            a. Client shall pay Provider the fees set forth in each SOW within thirty (30) days of receipt of
            an undisputed invoice.
          </p>
          <div style={{ position: "relative", marginBottom: 16 }}>
            <p>
              <span style={{ marginRight: 8 }}>b.</span>
              <span
                style={{
                  background: highlightedEdit === "fees-1" ? "#dbeafe" : "transparent",
                  borderLeft: highlightedEdit === "fees-1" ? "3px solid #2563eb" : "3px solid transparent",
                  paddingLeft: 4, transition: "all 0.2s",
                }}
              >
                Late amounts{" "}
                <span style={{ background: "#fecaca", textDecoration: "line-through", color: "#991b1b" }}>may</span>{" "}
                <span style={{ background: "#bbf7d0", color: "#166534", padding: "0 2px", borderRadius: 2 }}>shall</span>{" "}
                accrue interest at{" "}
                <span style={{ background: "#fecaca", textDecoration: "line-through", color: "#991b1b" }}>1.0</span>{" "}
                <span style={{ background: "#bbf7d0", color: "#166534", padding: "0 2px", borderRadius: 2 }}>1.5</span>{" "}
                percent per month or the maximum allowed by law, whichever is less
                <span style={{ background: "#bbf7d0", color: "#166534", padding: "0 2px", borderRadius: 2 }}>, beginning 10 days after the invoice due date</span>.
              </span>
            </p>
            {allComments.filter((c) => c.anchorId === "fees-1").map((c, i) => (
              <div key={c.id} style={{ position: "absolute", right: -20 - (i * 28), top: 0 }}>
                <div
                  onClick={() => setActiveComment(activeComment === c.id ? null : c.id)}
                  style={{
                    width: 24, height: 24,
                    background: c.isAI ? "#7c3aed" : activeComment === c.id ? "#2563eb" : "#e5e7eb",
                    borderRadius: 4, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke={c.isAI || activeComment === c.id ? "#fff" : "#6b7280"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>

          {/* Section 6 - IP */}
          <p style={{ fontWeight: 700, marginBottom: 8 }}>6. Intellectual Property</p>
          <p style={{ marginBottom: 8 }}>
            a. All Deliverables created by Provider under this Agreement shall be considered works made for
            hire and shall be owned by Client upon full payment.
          </p>
          <div style={{ position: "relative", marginBottom: 16 }}>
            <p>
              <span style={{ marginRight: 8 }}>b.</span>
              <span
                style={{
                  background: highlightedEdit === "ip-1" ? "#dbeafe" : "transparent",
                  borderLeft: highlightedEdit === "ip-1" ? "3px solid #2563eb" : "3px solid transparent",
                  paddingLeft: 4, transition: "all 0.2s",
                }}
              >
                Provider retains ownership of such pre-existing materials and{" "}
                <span style={{ background: "#bbf7d0", color: "#166534", padding: "0 2px", borderRadius: 2 }}>
                  grants Client a perpetual, non-exclusive, royalty-free license to use pre-existing materials
                  solely as embedded in the Deliverables, and
                </span>{" "}
                nothing in this Agreement shall be construed to transfer ownership of Provider's pre-existing
                intellectual property.
              </span>
            </p>
            {allComments.filter((c) => c.anchorId === "ip-1").map((c, i) => (
              <div key={c.id} style={{ position: "absolute", right: -20 - (i * 28), top: 0 }}>
                <div
                  onClick={() => setActiveComment(activeComment === c.id ? null : c.id)}
                  style={{
                    width: 24, height: 24,
                    background: c.isAI ? "#7c3aed" : activeComment === c.id ? "#2563eb" : "#e5e7eb",
                    borderRadius: 4, cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke={c.isAI || activeComment === c.id ? "#fff" : "#6b7280"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>

          <p style={{ fontWeight: 700, marginBottom: 8 }}>7. Indemnification</p>
          <p style={{ marginBottom: 16 }}>
            The Receiving Party shall indemnify and hold harmless the Disclosing Party from any claims, damages,
            or liabilities arising from the misuse or unauthorized disclosure of Confidential Information.
          </p>

          <p style={{ fontWeight: 700, marginBottom: 8 }}>8. Governing Law and Jurisdiction</p>
          <p style={{ marginBottom: 16 }}>
            This Agreement shall be governed by and construed in accordance with the laws of [Insert Jurisdiction],
            and any disputes arising under this Agreement shall be subject to the exclusive jurisdiction of the
            courts located in [Insert Jurisdiction].
          </p>

          <p style={{ fontWeight: 700, marginBottom: 8 }}>9. Dispute Resolution</p>
          <p style={{ marginBottom: 16 }}>
            Any dispute arising out of or relating to this Agreement shall first be resolved through good faith
            negotiations. If the parties are unable to resolve the dispute, it shall be submitted to binding
            arbitration in accordance with the rules of [Insert Arbitration Body].
          </p>
        </div>

        {/* Floating comment card */}
        {activeComment && activeCommentObj && (
          <div style={{
            position: "absolute",
            top: commentPositions[activeAnchor] || 230,
            right: -280,
            zIndex: 10,
          }}>
            <CommentCard comment={activeCommentObj} />
          </div>
        )}

        <div style={{ textAlign: "center", fontSize: 10, color: "#9ca3af", padding: "8px 0" }}>
          Page 1 of 3 &nbsp;&nbsp; 1625 words &nbsp;&nbsp; English (United States)
        </div>
      </div>
    </div>
  );
};

// --- Side Panel: Instruction Input ---
const InstructionScreen = ({ onSubmit }) => {
  const [instruction, setInstruction] = useState("Review this service agreement and suggest edits. Include any relevant comments on the document.");
  const [mode, setMode] = useState("accuracy");

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ flex: 1, padding: "0 16px" }}>
        <div style={{ marginBottom: 16, marginTop: 16 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>Instruction 1</span>
          </div>
          <textarea
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            placeholder="Describe how the document should be edited."
            style={{
              width: "100%", minHeight: 100, padding: 10, fontSize: 13,
              border: "1px solid #d1d5db", borderRadius: 8, resize: "vertical",
              fontFamily: "inherit", color: "#374151", lineHeight: 1.5, outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>
      </div>
      <div style={{
        display: "flex", alignItems: "center", gap: 8, padding: "12px 16px",
        borderTop: "1px solid #e5e7eb",
      }}>
        <button
          onClick={() => setMode("accuracy")}
          style={{
            flex: 1, padding: "6px 10px", fontSize: 11, borderRadius: 6, cursor: "pointer", whiteSpace: "nowrap",
            border: mode === "accuracy" ? "1px solid #2563eb" : "1px solid #d1d5db",
            background: mode === "accuracy" ? "#eff6ff" : "#fff",
            color: mode === "accuracy" ? "#2563eb" : "#6b7280",
            fontWeight: mode === "accuracy" ? 600 : 400,
          }}
        >Frontier</button>
        <button
          onClick={() => setMode("fast")}
          style={{
            flex: 1, padding: "6px 10px", fontSize: 11, borderRadius: 6, cursor: "pointer", whiteSpace: "nowrap",
            border: mode === "fast" ? "1px solid #2563eb" : "1px solid #d1d5db",
            background: mode === "fast" ? "#eff6ff" : "#fff",
            color: mode === "fast" ? "#2563eb" : "#6b7280",
            fontWeight: mode === "fast" ? 600 : 400,
          }}
        >Standard</button>
        <button
          onClick={onSubmit}
          style={{
            flex: 1, padding: "8px 10px", fontSize: 11, whiteSpace: "nowrap",
            background: "#2563eb", color: "#fff", border: "none",
            borderRadius: 8, cursor: "pointer", fontWeight: 600,
          }}
        >Suggest edits</button>
      </div>
    </div>
  );
};

// --- Side Panel: Results ---
const ResultsScreen = ({ onNewSession, onHighlight, editStates, onApply, onIgnore, onApplyAll }) => {
  const [applyMode, setApplyMode] = useState("apply-all"); // "apply-all" | "apply-all-comments"
  const [showDropdown, setShowDropdown] = useState(false);

  const label = applyMode === "apply-all" ? "Apply all" : "Apply all with comments";

  const handleClick = () => {
    onApplyAll(applyMode === "apply-all-comments");
    setShowDropdown(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px" }}>
        {SECTIONS.map((section, i) => (
          <SectionGroup
            key={i}
            section={section}
            editStates={editStates}
            onApply={onApply}
            onIgnore={onIgnore}
            onHighlight={onHighlight}
          />
        ))}
        <div style={{
          fontSize: 11, color: "#9ca3af", textAlign: "center",
          padding: "8px 0 16px", fontStyle: "italic",
        }}>
          AI can make mistakes. Review carefully.
        </div>
      </div>
      <div style={{
        display: "flex", alignItems: "center", gap: 8, padding: "12px 16px",
        borderTop: "1px solid #e5e7eb",
      }}>
        <div style={{ flex: 1, position: "relative" }}>
          <div style={{ display: "flex", borderRadius: 8, overflow: "hidden" }}>
            <button
              onClick={handleClick}
              style={{
                flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                padding: "8px 16px", fontSize: 13, background: "#2563eb", color: "#fff",
                border: "none", cursor: "pointer", fontWeight: 600,
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
              }}
            >
              <CheckIcon size={14} /> {label}
            </button>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "8px 10px", background: "#1d4ed8", color: "#fff",
                border: "none", borderLeft: "2px solid rgba(255,255,255,0.4)",
                cursor: "pointer",
              }}
            >
              <ChevronDown size={12} />
            </button>
          </div>
          {showDropdown && (
            <div style={{
              position: "absolute", bottom: "100%", left: 0, minWidth: 220,
              background: "#fff", border: "1px solid #d1d5db", borderRadius: 8,
              boxShadow: "0 4px 12px rgba(0,0,0,0.12)", marginBottom: 4,
              overflow: "hidden", zIndex: 10,
            }}>
              <div
                onClick={() => { setApplyMode("apply-all"); setShowDropdown(false); }}
                style={{
                  padding: "9px 12px", fontSize: 12, cursor: "pointer",
                  color: applyMode === "apply-all" ? "#2563eb" : "#374151",
                  background: applyMode === "apply-all" ? "#eff6ff" : "#fff",
                  fontWeight: applyMode === "apply-all" ? 600 : 400,
                  display: "flex", alignItems: "center", gap: 6,
                }}
              >
                <CheckIcon size={12} /> Apply all
              </div>
              <div
                onClick={() => { setApplyMode("apply-all-comments"); setShowDropdown(false); }}
                style={{
                  padding: "9px 12px", fontSize: 12, cursor: "pointer",
                  color: applyMode === "apply-all-comments" ? "#2563eb" : "#374151",
                  background: applyMode === "apply-all-comments" ? "#eff6ff" : "#fff",
                  fontWeight: applyMode === "apply-all-comments" ? 600 : 400,
                  borderTop: "1px solid #f3f4f6",
                  display: "flex", alignItems: "center", gap: 6,
                }}
              >
                <CommentIcon size={12} /> <span style={{ whiteSpace: "nowrap" }}>Apply all with comments</span>
              </div>
            </div>
          )}
        </div>
        <button
          onClick={onNewSession}
          style={{
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            padding: "8px 16px", fontSize: 13, background: "#fff", color: "#374151",
            border: "1px solid #d1d5db", borderRadius: 8, cursor: "pointer", fontWeight: 500,
            whiteSpace: "nowrap",
          }}
        >
          <RefreshIcon size={13} /> New session
        </button>
      </div>
    </div>
  );
};

// --- Loading Screen ---
const LoadingScreen = () => (
  <div style={{
    display: "flex", flexDirection: "column", alignItems: "center",
    justifyContent: "center", height: "100%", gap: 12,
  }}>
    <div style={{
      width: 32, height: 32, border: "3px solid #e5e7eb",
      borderTop: "3px solid #2563eb", borderRadius: "50%",
      animation: "spin 1s linear infinite",
    }} />
    <span style={{ fontSize: 13, color: "#6b7280" }}>Generating suggestions...</span>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

// --- Side Panel Shell ---
const SidePanel = ({ screen, onSubmit, onNewSession, onHighlight, editStates, onApply, onIgnore, onApplyAll }) => {
  const [activeView, setActiveView] = useState("assistant");

  return (
    <div style={{
      width: 400, minWidth: 400, display: "flex", flexDirection: "column",
      background: "#fff", borderLeft: "1px solid #d1d5db", height: "100%",
    }}>
      <div style={{
        padding: "12px 16px 8px", borderBottom: "1px solid #e5e7eb",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 24, height: 24, background: "#1e3a5f", borderRadius: 4,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff", fontSize: 9, fontWeight: 700,
          }}>nd</div>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#111827" }}>NetDocuments</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Toggle label="Track Changes" checked={false} onChange={() => {}} />
          <span style={{ fontSize: 16, color: "#9ca3af", cursor: "pointer" }}>✕</span>
        </div>
      </div>

      <div style={{
        padding: "8px 16px", display: "flex", alignItems: "center",
        justifyContent: "space-between", borderBottom: "1px solid #f3f4f6",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <select
            value={activeView}
            onChange={(e) => setActiveView(e.target.value)}
            style={{
              fontSize: 13, fontWeight: 600, color: "#111827",
              border: "none", background: "none", cursor: "pointer", outline: "none",
            }}
          >
            <option value="assistant">Assistant</option>
            <option value="editor">Editor</option>
          </select>
        </div>
        <span style={{ fontSize: 16, color: "#9ca3af", cursor: "pointer" }}>⋮</span>
      </div>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {screen === "instruction" && <InstructionScreen onSubmit={onSubmit} />}
        {screen === "loading" && <LoadingScreen />}
        {screen === "results" && (
          <ResultsScreen
            onNewSession={onNewSession}
            onHighlight={onHighlight}
            editStates={editStates}
            onApply={onApply}
            onIgnore={onIgnore}
            onApplyAll={onApplyAll}
          />
        )}
      </div>

      <div style={{
        padding: "6px 16px", background: "#fef3c7", borderTop: "1px solid #fde68a",
        fontSize: 11, color: "#92400e", textAlign: "center", fontWeight: 500,
      }}>
        Lo-fi Prototype — Ingesting Word Comments within Editor
      </div>
    </div>
  );
};

// --- Title Bar ---
const TitleBar = () => (
  <div style={{
    display: "flex", alignItems: "center", padding: "6px 12px",
    background: "#f3f4f6", borderBottom: "1px solid #d1d5db",
    fontSize: 12, color: "#6b7280",
  }}>
    <div style={{ display: "flex", gap: 6, marginRight: 12 }}>
      <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ef4444" }} />
      <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#f59e0b" }} />
      <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#22c55e" }} />
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span style={{ color: "#9ca3af" }}>AutoSave</span>
      <div style={{ width: 28, height: 14, borderRadius: 7, background: "#2563eb", position: "relative" }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#fff", position: "absolute", top: 2, right: 2 }} />
      </div>
    </div>
    <span style={{ marginLeft: "auto", fontWeight: 600, color: "#374151" }}>A - NDA</span>
    <div style={{ marginLeft: "auto", display: "flex", gap: 8, fontSize: 11 }}>
      <span style={{ cursor: "pointer" }}>Comments</span>
      <span style={{ cursor: "pointer" }}>Editing</span>
      <span style={{ cursor: "pointer" }}>Share</span>
    </div>
  </div>
);

// --- Main App ---
export default function EditorReasoningPrototype() {
  const [screen, setScreen] = useState("instruction");
  const [activeComment, setActiveComment] = useState(null);
  const [highlightedEdit, setHighlightedEdit] = useState(null);
  const [editStates, setEditStates] = useState({}); // { editId: 'applied' | 'ignored' }
  const [aiComments, setAiComments] = useState([]); // AI comments added to the doc

  const handleSubmit = () => {
    setScreen("loading");
    setTimeout(() => setScreen("results"), 1800);
  };

  const handleNewSession = () => {
    setScreen("instruction");
    setActiveComment(null);
    setHighlightedEdit(null);
    setEditStates({});
    setAiComments([]);
  };

  const addAiComment = (editId) => {
    const edit = EDITS.find((e) => e.id === editId);
    if (!edit) return;
    // Don't add duplicate
    if (aiComments.find((c) => c.anchorId === editId && c.isAI)) return;

    const newComment = {
      id: `ai-${editId}`,
      anchorId: editId,
      initials: "nd",
      author: "ND Assistant",
      date: new Date().toLocaleString("en-US", { month: "numeric", day: "numeric", year: "2-digit", hour: "numeric", minute: "2-digit" }),
      text: edit.aiComment.text,
      evidence: edit.aiComment.evidence,
      isAI: true,
    };
    setAiComments((prev) => [...prev, newComment]);
  };

  const handleApply = (editId) => {
    setEditStates((prev) => ({ ...prev, [editId]: "applied" }));
    addAiComment(editId);
    // Auto-open the new AI comment
    setActiveComment(`ai-${editId}`);
  };

  const handleIgnore = (editId) => {
    setEditStates((prev) => ({ ...prev, [editId]: "ignored" }));
  };

  const handleApplyAll = (withComments = false) => {
    const newStates = {};
    EDITS.forEach((e) => {
      if (!editStates[e.id]) {
        newStates[e.id] = "applied";
        if (withComments) addAiComment(e.id);
      }
    });
    setEditStates((prev) => ({ ...prev, ...newStates }));
  };

  return (
    <div style={{
      display: "flex", flexDirection: "column",
      width: "100vw", height: "100vh",
      fontFamily: "'Segoe UI', -apple-system, sans-serif",
      overflow: "hidden",
    }}>
      <TitleBar />
      <RibbonToolbar />
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <MockDocument
          activeComment={activeComment}
          setActiveComment={setActiveComment}
          highlightedEdit={highlightedEdit}
          aiComments={aiComments}
        />
        <SidePanel
          screen={screen}
          onSubmit={handleSubmit}
          onNewSession={handleNewSession}
          onHighlight={setHighlightedEdit}
          editStates={editStates}
          onApply={handleApply}
          onIgnore={handleIgnore}
          onApplyAll={handleApplyAll}
        />
      </div>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "3px 12px", background: "#f3f4f6", borderTop: "1px solid #d1d5db",
        fontSize: 10, color: "#9ca3af",
      }}>
        <span>Page 1 of 3 &nbsp; | &nbsp; 1625 words &nbsp; | &nbsp; English (United States) &nbsp; | &nbsp; Accessibility: Investigate</span>
        <span>Focus &nbsp; | &nbsp; 176%</span>
      </div>
    </div>
  );
}
