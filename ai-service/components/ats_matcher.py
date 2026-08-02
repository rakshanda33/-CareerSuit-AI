import streamlit as st

from analyzer import check_ats_match
from utils import score_to_emoji


def render_ats_matcher(resume_text):
    st.divider()

    st.header("🎯 ATS Keyword Matcher")
    st.caption(
        "Compare your resume with any Job Description to estimate ATS compatibility."
    )

    if not resume_text:
        st.info("⬆️ Upload your resume first.")
        return

    jd = st.text_area(
        "Paste Job Description",
        height=220,
        placeholder="Paste the complete job description here..."
    )

    if not st.button(
        "🚀 Analyze ATS Match",
        use_container_width=True,
        type="primary"
    ):
        return

    if not jd.strip():
        st.warning("Please paste a Job Description.")
        return

    with st.spinner("Analyzing ATS Match..."):
        ats = check_ats_match(resume_text, jd)

    score = ats.get("ats_score", 0)

    st.divider()

    col1, col2 = st.columns([1, 2])

    with col1:
        st.metric(
            "ATS Score",
            f"{score}%",
            delta=score_to_emoji(score)
        )

    with col2:
        st.success(ats.get("match_summary", ""))

    st.info(
        f"**Recommendation:** {ats.get('recommendation', '')}"
    )

    st.divider()

    c1, c2 = st.columns(2)

    with c1:
        with st.container(border=True):
            st.markdown("### ✅ Matched Keywords")

            for kw in ats.get("matched_keywords", []):
                st.markdown(f"- `{kw}`")

    with c2:
        with st.container(border=True):
            st.markdown("### ❌ Missing Keywords")

            for kw in ats.get("missing_keywords", []):
                st.markdown(f"- `{kw}`")