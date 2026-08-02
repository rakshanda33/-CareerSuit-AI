from pathlib import Path
import streamlit as st


def load_css():
    css_path = Path(__file__).parent.parent / "assets" / "styles.css"

    st.markdown(
        f"<style>{css_path.read_text(encoding='utf-8')}</style>",
        unsafe_allow_html=True,
    )