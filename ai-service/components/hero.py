import streamlit as st

def render_hero():
    st.markdown("""
    <div class="hero-banner">
        <h1>📄 AI Resume Analyzer</h1>
    </div>
    """, unsafe_allow_html=True)