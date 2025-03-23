document.getElementById("clonePage").addEventListener("click", async function() {
    let url = document.getElementById("urlInput").value;
    let originalCheckout = document.getElementById("originalCheckout").value;
    let newCheckout = document.getElementById("newCheckout").value;

    if (!url) {
        alert("Por favor, insira uma URL válida!");
        return;
    }

    try {
        let response = await fetch("https://corsproxy.io/?" + encodeURIComponent(url));
        let html = await response.text();

        // Substituir checkout se informado
        if (originalCheckout && newCheckout) {
            html = html.replace(new RegExp(originalCheckout, "g"), newCheckout);
        }

        // Criar nova janela com a página clonada
        let newWindow = window.open();
        newWindow.document.write(html);
    } catch (error) {
        console.error("Erro ao clonar a página:", error);
        alert("Erro ao obter os dados da página. Verifique a URL.");
    }
});

// Função para otimizar a página com IA
document.getElementById("optimizeAI").addEventListener("click", async function() {
    let url = document.getElementById("urlInput").value;
    if (!url) {
        alert("Por favor, insira uma URL válida!");
        return;
    }

    try {
        let response = await fetch("https://corsproxy.io/?" + encodeURIComponent(url));
        let html = await response.text();

        // Enviar HTML para otimização com IA
        optimizeWithAI(html);
    } catch (error) {
        console.error("Erro ao capturar a página:", error);
        alert("Erro ao obter os dados da página.");
    }
});

// Integração com a IA (OpenAI)
async function optimizeWithAI(html) {
    let apiKey = "SUA_CHAVE_OPENAI"; // Substitua pela sua chave de API

    let response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: [
                { role: "system", content: "Você é um especialista em copywriting e conversão de páginas de vendas." },
                { role: "user", content: `Melhore esta página para aumentar a conversão:\n\n${html}` }
            ]
        })
    });

    let data = await response.json();
    let optimizedHtml = data.choices[0].message.content;

    // Exibir a versão otimizada
    let newWindow = window.open();
    newWindow.document.write(optimizedHtml);
}
