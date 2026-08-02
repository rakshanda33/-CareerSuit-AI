# app.py
import streamlit as st

from analyzer import analyze_resume
from config import APP_TITLE, APP_ICON

from components.ui import load_css
from components.hero import render_hero
from components.sidebar import render_sidebar
from components.footer import render_footer
from components.upload import render_upload
from components.analysis import render_analysis
from components.ats_matcher import render_ats_matcher
from components.bullet_rewriter import render_bullet_rewriter
# ── Page config ────────────────────────────────────────────────────────
st.set_page_config(
    page_title=APP_TITLE,
    page_icon=APP_ICON,
    layout="wide"
)
# ── Load CSS ─────────────────────────────────────────────────────────────
load_css()


# ── Header ─────────────────────────────────────────────────────────────
render_hero()

# ── Session state init ─────────────────────────────────────────────────
if "resume_text" not in st.session_state:
    st.session_state.resume_text = None
if "analysis"    not in st.session_state:
    st.session_state.analysis    = None

# ── Sidebar ─────────────────────────────────────────────────────────────
render_sidebar()

# ── File Upload ─────────────────────────────────────────────────────────
uploaded_file = render_upload()

if uploaded_file:

    # ── Analyze button ──────────────────────────────────────────────
    col_btn, col_clear = st.columns([5, 1])
    with col_btn:
        analyze_clicked = st.button(
            "🔍 Analyze Resume",
            type="primary",
            use_container_width=True
        )
    with col_clear:
        if st.button("🔄 Reset", use_container_width=True):
            st.session_state.resume_text = None
            st.session_state.analysis    = None
            st.rerun()

    if analyze_clicked:
        with st.spinner("🤖 Gemini is reviewing your resume..."):
            try:
                st.session_state.analysis = analyze_resume(
                    st.session_state.resume_text
                )
            except (RuntimeError, ValueError) as e:
                st.error(f"❌ {e}")
                st.stop()

    # ── Display Results ─────────────────────────────────────────────
    if st.session_state.analysis:
        render_analysis(st.session_state.analysis)

# ── Tab 2: ATS Matcher ──────────────────────────────────────────────────
render_ats_matcher(st.session_state.resume_text)

# ── Tab 3: Bullet Rewriter ──────────────────────────────────────────────
render_bullet_rewriter()

render_footer()