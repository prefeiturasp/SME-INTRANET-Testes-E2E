pipeline {
    triggers {
        cron('30 20 * * 0-5')
    }

    options {
        buildDiscarder(logRotator(numToKeepStr: '20', artifactNumToKeepStr: '20'))
        disableConcurrentBuilds()
        skipDefaultCheckout()
    }

    agent {
        kubernetes {
            label 'cypress'
            defaultContainer 'cypress-13-6-6'
        }
    }

    environment {
        TEST_DIR = "${env.WORKSPACE}"
        ALLURE_PATH = "${env.WORKSPACE}/allure-results"
        WORKSPACE_DIR = "${env.WORKSPACE}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Instalar Dependências') {
            steps {
                dir("${TEST_DIR}") {
                    sh '''
                        rm -rf node_modules package-lock.json
                        npm cache clean --force
                        mkdir -p /home/jenkins/.cache/Cypress
                        chmod -R 777 /home/jenkins/.cache/Cypress
                        wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | tee /etc/apt/trusted.gpg.d/google.asc >/dev/null
                        mkdir -p /usr/share/man/man1/
                        apt update && apt install -y default-jre openjdk-17-jdk zip
                        npm install
                        npm install @shelex/cypress-allure-plugin allure-mocha crypto-js@4.1.1 --save-dev
                    '''
                }
            }
        }

        stage('Executar') {
            steps {
                dir("${TEST_DIR}") {
                    catchError(buildResult: 'UNSTABLE', stageResult: 'FAILURE') {
                        sh '''
                            NO_COLOR=1 npx cypress run \
                                --headless \
                                --spec cypress/e2e/**/* \
                                --browser chrome \
                                --reporter mocha-allure-reporter
                        '''
                    }
                }
            }
        }

        stage('Gerar Allure Report') {
            steps {
                script {
                    catchError(buildResult: 'SUCCESS', stageResult: 'SUCCESS') {
                        def hasResults = fileExists("${ALLURE_PATH}") && sh(
                            script: "ls -A ${ALLURE_PATH} | wc -l", returnStdout: true
                        ).trim() != "0"

                        if (hasResults) {
                            echo "Gerando relatório Allure..."
                            sh """
                                export JAVA_HOME=\$(dirname \$(dirname \$(readlink -f \$(which java))))
                                export PATH=\$JAVA_HOME/bin:/usr/local/bin:\$PATH

                                allure generate ${ALLURE_PATH} --clean --output allure-report
                                zip -r allure-results-${BUILD_NUMBER}-\$(date +"%d-%m-%Y").zip allure-results
                            """
                        } else {
                            echo "⚠️ Diretório ${ALLURE_PATH} está ausente ou vazio. Pulando geração do relatório."
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            script {
                sh 'chmod -R 777 $WORKSPACE || true'

                // Envio para o plugin Allure
                if (fileExists("${ALLURE_PATH}") && sh(script: "ls -A ${ALLURE_PATH} | wc -l", returnStdout: true).trim() != "0") {
                    allure includeProperties: false, jdk: '', results: [[path: "${ALLURE_PATH}"]]
                } else {
                    echo "⚠️ Resultados do Allure não encontrados ou vazios, plugin Allure não será acionado."
                }

                // Arquiva o zip
                def zipExists = sh(script: "ls allure-results-*.zip 2>/dev/null || true", returnStdout: true).trim()
                if (zipExists) {
                    archiveArtifacts artifacts: 'allure-results-*.zip', fingerprint: true
                } else {
                    echo "⚠️ Nenhum .zip de Allure encontrado para arquivamento. Pulando archiveArtifacts."
                }
            }
        }

        success {
            sendTelegram("☑️ Job Name: ${JOB_NAME} \nBuild: ${BUILD_DISPLAY_NAME} \nStatus: Success \nLog: \n${env.BUILD_URL}allure")
        }
        unstable {
            sendTelegram("💣 Job Name: ${JOB_NAME} \nBuild: ${BUILD_DISPLAY_NAME} \nStatus: Unstable \nLog: \n${env.BUILD_URL}allure")
        }
        failure {
            sendTelegram("💥 Job Name: ${JOB_NAME} \nBuild: ${BUILD_DISPLAY_NAME} \nStatus: Failure \nLog: \n${env.BUILD_URL}allure")
        }
        aborted {
            sendTelegram("😥 Job Name: ${JOB_NAME} \nBuild: ${BUILD_DISPLAY_NAME} \nStatus: Aborted \nLog: \n${env.BUILD_URL}console")
        }
    }
}

def sendTelegram(message) {
    def encodedMessage = URLEncoder.encode(message, "UTF-8")
    withCredentials([
        string(credentialsId: 'telegramTokensigpae', variable: 'TOKEN'),
        string(credentialsId: 'telegramChatIdsigpae', variable: 'CHAT_ID')
    ]) {
        response = httpRequest (
            consoleLogResponseBody: true,
            contentType: 'APPLICATION_JSON',
            httpMode: 'GET',
            url: "https://api.telegram.org/bot${TOKEN}/sendMessage?text=${encodedMessage}&chat_id=${CHAT_ID}&disable_web_page_preview=true",
            validResponseCodes: '200'
        )
        return response
    }
}
