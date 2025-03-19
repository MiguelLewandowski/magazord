Tive que começar a pensar sobre a estrutura das páginas, pois talvez não precise de várias páginas e posso otimizar com o uso de layout já que entre repos e starred pouca coisa muda na tela


Decidi que vou reestruturar como as páginas funcionam uma vez que percebi que o layout de repositories e starred são o mesmo, então vou utilizar layout aninhado com repositories/starred para manter o código reutilizavel e modular. Além disso adicionei uma rota '/name' para pegar como slug da pagina e conseguir pegar os dados dado o nome do repositório na url.