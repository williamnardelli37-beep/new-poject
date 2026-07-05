let tipoAtual = "Construção";
    const campos = ['nome', 'tel', 'cidade', 'endereco', 'obs'];

    // Máscara de Telefone Dinâmica
    document.getElementById('tel').addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 11) value = value.slice(0, 11);
        if (value.length > 10) {
            value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
        } else if (value.length > 5) {
            value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
        } else if (value.length > 2) {
            value = value.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
        } else if (value.length > 0) {
            value = value.replace(/^(\d{0,2})/, "($1");
        }
        e.target.value = value;
    });

    // Local Storage: Salvar ao digitar
    campos.forEach(id => {
        document.getElementById(id).addEventListener('input', (e) => {
            localStorage.setItem('gm_v2_' + id, e.target.value);
        });
    });

    // Local Storage: Carregar ao iniciar
    window.addEventListener('load', () => {
        campos.forEach(id => {
            const salvo = localStorage.getItem('gm_v2_' + id);
            if(salvo) document.getElementById(id).value = salvo;
        });
    });

    // --- NOVIDADE: Limpar ao voltar para a página ---
    window.addEventListener('pageshow', (event) => {
        // Se o histórico indicar que o usuário está voltando ou se a página foi persistida
        if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
            // Limpa o formulário visualmente
            document.querySelectorAll('.item').forEach(i => i.checked = false);
            campos.forEach(id => {
                const campo = document.getElementById(id);
                if(campo) campo.value = "";
                localStorage.removeItem('gm_v2_' + id); // Remove do banco de dados
            });
        }
    });

    function switchTab(tipo) {
        tipoAtual = tipo === 'construcao' ? "Construção" : "Reforma";
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        if(event && event.currentTarget) event.currentTarget.classList.add('active');
        document.getElementById('construcao').classList.remove('active');
        document.getElementById('reforma').classList.remove('active');
        document.getElementById(tipo).classList.add('active');
    }

    function enviarWhatsApp() {
        const nome = document.getElementById('nome').value.trim();
        const tel = document.getElementById('tel').value.trim();
        const cidade = document.getElementById('cidade').value.trim();
        const endereco = document.getElementById('endereco').value.trim();
        const obs = document.getElementById('obs').value.trim();

        if (nome.split(' ').length < 2) {
            alert("Por favor, informe seu nome completo.");
            return;
        }
        if (tel.length < 14 || !cidade) {
            alert("Preencha WhatsApp e Cidade corretamente.");
            return;
        }

        let selecionados = [];
        document.querySelectorAll('.item:checked').forEach(i => selecionados.push("• " + i.value));

        if (selecionados.length === 0) {
            alert("Selecione ao menos um serviço.");
            return;
        }

        const numeroWhats = "54999154578"; 
        
        const mensagem = `*🏗️ GM OBRAS - NOVO ORÇAMENTO*%0A%0A` +
                         `*SOLICITAÇÃO:* ${tipoAtual}%0A` +
                         `*CLIENTE:* ${nome}%0A` +
                         `*WHATSAPP:* ${tel}%0A` +
                         `*CIDADE:* ${cidade}%0A` +
                         `*ENDEREÇO:* ${endereco}%0A%0A` +
                         `*📦 SERVIÇOS SELECIONADOS:*%0A${selecionados.join("%0A")}%0A%0A` +
                         `*💡 OBSERVAÇÕES:*%0A${obs || "Nenhuma"}`;

        window.open(`https://wa.me/${numeroWhats}?text=${mensagem}`);
    }