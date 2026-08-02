import streamlit as st

from analyzer import rewrite_bullet


def render_bullet_rewriter():
    """Render the resume bullet rewriter."""

    st.divider()
    st.subheader("✏️ Resume Bullet Rewriter")
    st.caption("Paste a weak bullet point and get 3 stronger versions")

    weak = st.text_input(
        "Your bullet point",
        placeholder="e.g. Worked on the company website"
    )

    if weak and st.button("✨ Rewrite Bullet", type="secondary"):

        with st.spinner("Writing stronger versions..."):

            try:
                rewrites = rewrite_bullet(weak)

            except (RuntimeError, ValueError) as e:

                st.error(str(e))

                with st.expander("🔧 Troubleshooting"):

                    st.markdown("""
### Common Fixes

**Rate Limit Error**
- Wait 1–2 minutes
- Try again
- Use another Gemini API key

**Invalid API Key**
- Check your `.env` file
- Restart Streamlit

**PDF Error**
- Upload a text-based PDF
- Avoid scanned image PDFs
                    """)

                st.stop()

        st.markdown("**3 stronger versions:**")

        for i, version in enumerate(rewrites, 1):
            st.markdown(f"**{i}.** {version}")