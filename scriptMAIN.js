function abrirPopup() {
    const largura = 500;
    const altura = 400;
    const esquerda = (window.screen.width - largura) / 2;
    const topo = (window.screen.height - altura) / 2;

    try {
        const popup = window.open(
            "login.html",
            "Login",
            `width=${largura},height=${altura},left=${esquerda},top=${topo}`
        );
        
        if (!popup || popup.closed || typeof popup.closed === 'undefined') {
            alert("Por favor, permita popups para este site.");
        }
    } catch (e) {
        console.error("Erro ao abrir popup:", e);
        alert("Não foi possível abrir a janela de login.");
    }
}
