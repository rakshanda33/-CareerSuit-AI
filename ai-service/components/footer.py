import streamlit as st

from config import APP_VERSION


def render_footer():
    """Render the application footer."""

    st.divider()

    st.caption(
        f"AI Resume Analyzer • Version {APP_VERSION} • Built with Streamlit & Gemini AI"
    )