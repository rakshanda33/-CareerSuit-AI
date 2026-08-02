import streamlit as st

from components.score_card import render_score_card
from components.report import render_download_report


def render_analysis(r):
    """Render the complete resume analysis section."""

    st.divider()

    # Resume Score Card
    render_score_card(r)

    # ==========================================================
    # Professional Summary
    # ==========================================================
    st.divider()

    with st.container(border=True):
        st.subheader("📋 Professional Summary")
        st.write(r.get("summary", ""))

    # ==========================================================
    # Strengths / Weaknesses / Missing Sections
    # ==========================================================
    st.divider()

    c1, c2, c3 = st.columns(3)

    with c1:
        with st.container(border=True):
            st.markdown("### ✅ Strengths")
            for item in r.get("strengths", []):
                st.markdown(f"- {item}")

    with c2:
        with st.container(border=True):
            st.markdown("### ⚠️ Weaknesses")
            for item in r.get("weaknesses", []):
                st.markdown(f"- {item}")

    with c3:
        with st.container(border=True):
            st.markdown("### ❌ Missing Sections")
            for item in r.get("missing_sections", []):
                st.markdown(f"- {item}")

    # ==========================================================
    # Improvements / ATS Issues
    # ==========================================================
    st.divider()

    c4, c5 = st.columns(2)

    with c4:
        with st.container(border=True):
            st.markdown("### 💡 Improvement Suggestions")
            for i, tip in enumerate(r.get("improvements", []), 1):
                st.markdown(f"**{i}.** {tip}")

    with c5:
        with st.container(border=True):
            st.markdown("### 🤖 ATS Issues")
            for item in r.get("ats_issues", []):
                st.markdown(f"- {item}")

    # ==========================================================
    # Skills
    # ==========================================================
    if r.get("skills_found"):
        st.divider()

        with st.container(border=True):
            st.markdown("### 🛠️ Skills Detected")

            chips = ""
            for skill in r["skills_found"]:
                chips += f'<span class="skill-chip">{skill}</span> '

            st.markdown(chips, unsafe_allow_html=True)

    # ==========================================================
    # Download Report
    # ==========================================================
    st.divider()

    render_download_report(r)