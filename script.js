async function otimizarPagina() {
    try {
        let url = document.getElementById("urlInput").value;
        if (!url) {
            alert("Por favor, insira uma URL válida.");
            return;
        }

        // Buscar o conteúdo da página original
        let response = await fetch(url);
        let html = await response.text();

        // Enviar para otimização via IA
        let otimizado = await otimizarComIA(html);

        // Criar um Blob com o novo HTML otimizado
        let blob = new Blob([otimizado], { type: "text/html" });

        // Criar link de download automático
        let a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "pagina_otimizada.html";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        alert("Página otimizada e pronta para download!");

    } catch (error) {
        console.error("Erro ao otimizar a página:", error);
        alert("Erro ao otimizar a página. Verifique a URL e tente novamente.");
    }
}

// Simulação de otimização com IA (pode ser integrado com OpenAI)
async function otimizarComIA(html) {
    // Aqui você pode integrar com OpenAI ou outra IA
    let melhorias = `
        - Melhore chamadas para ação (CTAs).
        - Aprimore títulos e subtítulos para maior impacto.
        - Reduza textos longos para mensagens diretas e persuasivas.
        - Otimize imagens para carregar mais rápido.
    `;
    
    return `<!-- Página otimizada com IA -->\n${html}\n<!-- Melhorias aplicadas: ${melhorias} -->`;
}
