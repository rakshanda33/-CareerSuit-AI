import streamlit as st
from utils import score_to_emoji


def render_score_card(result):
    score = round(result.get("score", 0))
    score = max(0, min(100, score))

    verdict = result.get("verdict", "—")
    emoji = score_to_emoji(score)
    
    # Progress bar color
    if score >= 80:
        color = "#22c55e"
    elif score >= 60:
        color = "#3b82f6"
    elif score >= 40:
        color = "#f59e0b"
    else:
        color = "#ef4444"

    st.markdown(
        f"""
        <div class="score-card">

            <div class="score-number">
                {score}
            </div>

            <div class="score-label">
                Resume Score / 100
            </div>

            <div class="verdict-chip">
                {emoji} {verdict}
            </div>

            <div class="progress-wrapper">

                <div class="progress-bar">
                    <div class="progress-fill"
                         style="width:{score}%;
                         background:{color};">
                    </div>
                </div>

            </div>

        </div>
        """,
        unsafe_allow_html=True
    )