import streamlit as st


def render_download_report(result):
    score = result.get("score", 0)
    verdict = result.get("verdict", "—")

    report = f"""# Resume Analysis Report
Score: {score}/100 | Verdict: {verdict}

## Summary
{result.get('summary', '')}

## Strengths
{chr(10).join(f'- {s}' for s in result.get('strengths', []))}

## Weaknesses
{chr(10).join(f'- {w}' for w in result.get('weaknesses', []))}

## Improvement Tips
{chr(10).join(f'{i+1}. {t}' for i, t in enumerate(result.get('improvements', [])))}

## ATS Issues
{chr(10).join(f'- {a}' for a in result.get('ats_issues', []))}

## Skills Found
{', '.join(result.get('skills_found', []))}
"""

    st.divider()

    st.download_button(
        "📥 Download Report (.md)",
        data=report,
        file_name="resume_analysis.md",
        mime="text/markdown",
        use_container_width=True,
    )