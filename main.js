function showBootError(error) {
  console.error("게임 시작 실패:", error);

  const existing = document.getElementById("bootError");
  if (existing) existing.remove();

  const panel = document.createElement("div");
  panel.id = "bootError";
  panel.style.position = "fixed";
  panel.style.left = "50%";
  panel.style.top = "50%";
  panel.style.transform = "translate(-50%, -50%)";
  panel.style.zIndex = "9999";
  panel.style.width = "min(520px, calc(100vw - 32px))";
  panel.style.padding = "20px 22px";
  panel.style.borderRadius = "18px";
  panel.style.background = "rgba(18, 14, 18, 0.96)";
  panel.style.border = "1px solid rgba(255,255,255,0.18)";
  panel.style.boxShadow = "0 24px 48px rgba(0,0,0,0.35)";
  panel.style.color = "#f5ead7";
  panel.style.fontFamily = "\"Segoe UI\", \"Malgun Gothic\", sans-serif";
  panel.innerHTML =
    "<div style=\"font-size:20px;font-weight:700;margin-bottom:10px;\">게임 실행 오류</div>" +
    "<div style=\"font-size:14px;line-height:1.6;opacity:0.92;\">" +
    "초기화 중 문제가 발생했습니다. 새로고침 후 다시 시도하거나 저장 데이터를 비우고 확인해 주세요." +
    "</div>" +
    `<pre style="margin:14px 0 0;padding:12px;border-radius:12px;background:rgba(255,255,255,0.06);white-space:pre-wrap;font-size:12px;line-height:1.5;">${String(error?.message || error)}</pre>`;
  document.body.appendChild(panel);
}

function bootGame() {
  try {
    if (!window.GameUI || !window.GameApp) {
      throw new Error("게임 스크립트가 아직 준비되지 않았습니다.");
    }

    const canvas = document.getElementById("gameCanvas");
    const ui = window.GameUI.createUIRefs(document);
    const game = new window.GameApp.Game(canvas, ui);
    game.start();
    window.__game = game;
  } catch (error) {
    showBootError(error);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootGame, { once: true });
} else {
  bootGame();
}
