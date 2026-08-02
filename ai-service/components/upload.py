import streamlit as st
from utils import extract_text_from_pdf


def render_upload():
    """Render the resume upload section."""

    st.header("📂 Upload Your Resume")

    st.caption(
        "Upload a PDF resume to receive an AI-powered review, ATS analysis, "
        "improvement suggestions, and bullet rewriting."
    )

    with st.container(border=True):

        st.markdown("### You'll receive:")

        st.markdown("""
✅ Resume Score

✅ ATS Compatibility Check

✅ AI Improvement Suggestions

✅ Resume Bullet Rewriter
""")

        uploaded_file = st.file_uploader(
            "Choose your PDF resume",
            type=["pdf"],
            help="PDF only • Maximum 10 pages",
        )

    if uploaded_file:

        try:
            if st.session_state.resume_text is None:
                st.session_state.resume_text = extract_text_from_pdf(uploaded_file)

            size_kb = uploaded_file.size / 1024

            st.success("✅ Resume uploaded successfully!")

            col1, col2 = st.columns(2)

            with col1:
                st.metric("📄 File", uploaded_file.name)

            with col2:
                st.metric("📦 Size", f"{size_kb:.1f} KB")

        except ValueError as e:
            st.error(f"❌ {e}")
            st.stop()

    return uploaded_file