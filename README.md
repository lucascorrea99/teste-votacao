# DOCUMENTAÇÃO DO VOTACAO-TESTE

### votacao-backend/app.py

## Descrição

Este é um aplicativo de votação simples construído com Flask, uma microframework para Python. Ele permite que os usuários votem em participantes e visualizem os resultados da votação.

## Dependências

- Flask: Microframework para construção de aplicações web.
- Flask-CORS: Extensão para lidar com Cross Origin Resource Sharing (CORS), tornando o compartilhamento de recursos entre diferentes domínios possível.
- OpenTelemetry: Framework e SDK para observabilidade.
- requests: Biblioteca para fazer requisições HTTP.
- os: Módulo para interagir com o sistema operacional.

## Rotas

### POST /vote

Recebe um JSON com o nome do participante e incrementa o voto para esse participante. Se o participante não existir, retorna um erro.

### POST /validateCaptcha

Recebe um JSON com a resposta do captcha e valida. Se o captcha for inválido, retorna um erro.

### GET /votePercentages

Retorna um JSON com a porcentagem de votos para cada participante.

### GET /admin/votes

Retorna um JSON com a contagem de votos para cada participante.

## Funções

### is_valid_captcha(captcha_response)

Verifica se a resposta do captcha é válida. Retorna True se for válida, False caso contrário.

## Execução

Para executar o aplicativo, use o comando `python app.py`. O aplicativo será executado no endereço `0.0.0.0` e estará disponível na porta `5000` (a porta padrão do Flask).


# Componentes do projeto:


1
**RELEASE DRAFTER**

O Release Drafter é uma ferramenta do GitHub que automatiza a criação de notas de lançamento para novas versões de seu software. Ele funciona como uma GitHub Action que é acionada quando você cria uma nova tag de lançamento em seu repositório.
Quando você faz um commit em seu repositório, o Release Drafter adiciona automaticamente detalhes sobre esse commit às notas de lançamento do próximo lançamento. Ele agrupa essas notas por rótulos de pull request, e você pode personalizar o formato das notas de lançamento usando um arquivo de configuração `.github/release-drafter.yml` em seu repositório.
Isso pode economizar muito tempo e esforço na documentação de novos lançamentos, pois você não precisa lembrar e escrever manualmente todas as mudanças que foram feitas desde o último lançamento.
## .github/release-drafter.yml e .github/workflowsrelease-drafter.yml

ref:https://github.com/release-drafter/release-drafter



**PIPELINES:**

## .github/workflows/pipeline-dev.yml || .github/workflows/pipeline-prod.yml

As duas pipelines são usadas para implementar a prática de CI/CD (Integração Contínua / Entrega Contínua) em dois ambientes diferentes: desenvolvimento (dev) e produção (prod). Ambas as pipelines seguem um fluxo similar de construção (build), teste (test) e implantação (deploy), mas existem algumas diferenças chave entre elas.

**Pipeline de Desenvolvimento (dev)**

Esta pipeline é acionada quando um push é feito para a branch 'dev'. Ela é projetada para construir, testar e implantar o código na fase de desenvolvimento. A imagem Docker é construída com a tag 'dev' seguida pelo SHA do commit do GitHub. A implantação é feita usando o Helm, uma ferramenta para gerenciar pacotes Kubernetes, e o auto scaling é desativado.

**Pipeline de Produção (prod)**

Esta pipeline é acionada quando uma release é publicada na branch 'main'. Ela é projetada para construir, testar e implantar o código na fase de produção. A imagem Docker é construída com a tag sendo o nome da release. A implantação é feita usando o Helm, e as configurações de ingresso são definidas para rotear o tráfego para o serviço correto.

**Diferenças Principais**

1. **Gatilho**: A pipeline de desenvolvimento é acionada por um push na branch 'dev', enquanto a pipeline de produção é acionada por uma release publicada na branch 'main'.

2. **Tag da Imagem Docker**: Na pipeline de desenvolvimento, a tag da imagem Docker é 'dev' seguida pelo SHA do commit do GitHub. Na pipeline de produção, a tag da imagem Docker é o nome da release.

3. **Configurações de Implantação**: Na pipeline de desenvolvimento, o auto scaling é desativado. Na pipeline de produção, as configurações de ingresso são definidas para rotear o tráfego para o serviço correto.

4. **Ambiente**: A pipeline de dev é usada para o ambiente de desenvolvimento, enquanto a pipeline de prod é usada para o ambiente de produção.



**FRONTEND:**

## HTML:

**admins.html**: Pagina para os administradores acessada por um link externo.
**confirmation.html**: Pagina que exibe a mensagem de confirmação de voto.
**index.html**: Pagina inicial com um Recaptcha.
**votacao.html**: Pagina onde ocorrea a votação.

## JS:

**admin.js**: Script JS para a pagina admins.html.
**confirmatioon.js**: Script JS para a pagina confitmation.html.
**config.js**: Script JS para a pagina index.html.
**script.js**: Script JS para a pagina votacao.html.

## CCS:

**styles.css**: CSS geral para os htmls.



**DEVOPS**

## KUBERNETES:

**deployment.yaml**: Deployment é um recurso do Kubernetes que gerencia a criação e atualização de Pods. O arquivo deployment.yaml define as especificações para um Deployment.
## votacao-devops/kubernetes/backend/deployment-backend.yml || votacao-devops/kubernetes/frontend/deployment-frontend.yml

**namespaces.yaml**: Namespaces são uma maneira de dividir os recursos do cluster entre vários usuários (via resource quota), ou simplesmente para separar ambientes de teste, desenvolvimento e produção.
## votacao-devops/kubernetes/namespaces.yml

**secrets.yml**: O recurso Secrets no Kubernetes é usado para armazenar e gerenciar informações sensíveis, como senhas, tokens OAuth, chaves ssh e outros dados que você não quer expor em sua configuração de aplicativo.
## votacao-devops/kubernetes/secrets.yml

**runners**: Os self-hosted runners do GitHub Actions são servidores que você hospeda, para executar jobs de CI/CD do GitHub Actions. Eles podem ser máquinas físicas ou virtuais sob seu controle, onde você instala o software do runner. Os self-hosted runners oferecem mais controle sobre o ambiente de hardware, sistema operacional e ferramentas de software do que os runners hospedados pelo GitHub. Eles são úteis quando você precisa de um ambiente de execução personalizado ou específico que o GitHub não oferece.
## votacao-devops/kubernetes/runnersVotacao.yml

## DOCKER:

**dockerfile**:Dockerfiles são scripts de texto que contêm instruções para construir uma imagem Docker. Eles definem o ambiente de execução para um aplicativo, incluindo o sistema operacional base, dependências de software, arquivos de origem do aplicativo e parâmetros de execução. Quando o Docker lê um Dockerfile, ele executa cada instrução sequencialmente para criar uma imagem Docker final que pode ser usada para criar contêineres.
## votacao-devops/dockerfile || votacao-backend/dockerfile || votacao-devops/dockerfile

## HELM:

**Charts**: Um Chart é um pacote Helm, que contém todas as definições de recursos necessárias para executar uma aplicação, ferramenta ou serviço dentro de um cluster Kubernetes. Um Chart é organizado como uma coleção de arquivos dentro de um diretório. A estrutura de diretório de um Chart pode conter arquivos de templates Kubernetes, arquivos de valores padrão, metadados do Chart e arquivos de documentação.
## votacao-devops/helm/votacao-backend/Chart.yaml || votacao-devops/helm/votacao-frontend/Chart.yaml

**values.yml**: O arquivo values.yaml é onde são definidos os valores padrão para um Chart. Este arquivo contém os valores padrão para os templates do Chart. Quando um Chart é instalado, os valores no arquivo values.yaml são usados para preencher os placeholders nos templates do Chart, gerando um conjunto completo de manifestos Kubernetes. No entanto, ao instalar ou atualizar um Chart, você pode fornecer seu próprio arquivo de valores para substituir os valores padrão. Isso permite personalizar a instalação do Chart para atender às suas necessidades específicas.
## votacao-devops/helm/votacao-backend/values.yaml || votacao-devops/helm/votacao-frontend/values.yaml

**REF**: https://helm.sh/docs/



# COMO RODAR O VOTACAO-TESTE NA SUA MAQUINA:

## Tenha o Docker instalado:

## Faça o pull da imagem: deploy-votacao:1.0

## Execute a imagem num container.

