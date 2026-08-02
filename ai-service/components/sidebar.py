import streamlit as st


def render_sidebar():
    """Render the application sidebar."""

    with st.sidebar:
        st.header("🚀 Features")

        st.markdown("""
**AI Resume Analyzer** uses Google Gemini to give you:

- 📊 Resume score & verdict
- ✅ Strengths & weaknesses
- 🎯 ATS keyword analysis
- ✏️ Bullet point rewriter
- 📥 Downloadable report
""")

        st.divider()

        st.caption(
            "Built as part of a 50-Day AI Engineering Bootcamp"
        )
        st.success("Powered by Gemini 2.5")